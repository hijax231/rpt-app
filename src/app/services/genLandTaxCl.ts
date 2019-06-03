import { Injectable } from '@angular/core';
import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {

  URL: string = '../assets/temp/clearance_template.docx';
  outFile: any;

  constructor(private http: HttpClient) { }

  loadFile(url: any, callback: any) {
    JSZipUtils.getBinaryContent(url, callback);
  }

  lTaxCl(data: any) {
    this.loadFile(this.URL, (err: any, cont: any) => {
      if(err) { throw err; }
      const zip = new JSZip(cont);
      const doc = new docxtemplater().loadZip(zip)
      doc.setData(data)
      try {
        doc.render()
      } catch (e) {
        console.log(JSON.stringify({ error: e }))
        throw e;
      }
      let out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      let fileName = 'LTC_' + data.pin + '_' + data.current_date +'.docx';
      saveAs(out, fileName);
      let link = '/user/' + this.getUser() + '/print/' + JSON.stringify(out);
      window.open(link, '_blank');
    });
  }

  getUser() {
    let token = localStorage.getItem('auth');
    let obj = jwt_decode(token)
    return obj.username;
  }
}