import { Injectable } from '@angular/core';
import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import * as async from 'async';

@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {

  private URL: string = '../assets/temp/clearance_template.docx';
  public outFile: any = null;

  constructor(private http: HttpClient) { }

  loadFile(data: any) {
    JSZipUtils.getBinaryContent(this.URL, (err, cont) => {
      if (err) { throw err; }
      const zip = new JSZip(cont);
      const doc = new docxtemplater().loadZip(zip)
      doc.setData(data)
      try {
        doc.render()
      } catch (e) {
        console.log(JSON.stringify({ error: e }))
        throw e;
      }
      this.outFile = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
    });
    return this.outFile
  }

  lTaxCl(data: any) {
    return this.loadFile
  }

  getUser() {
    let token = localStorage.getItem('auth');
    let obj = jwt_decode(token)
    return obj.username;
  }
}