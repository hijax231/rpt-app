import { Injectable } from '@angular/core';
import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {

  URL: string = '../assets/temp/clearance_template.docx';

  constructor(private http: HttpClient) { }

  loadFile(url: any, callback: any) {
    JSZipUtils.getBinaryContent(url, callback);
  }

  getPosHoldersCl(): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('auth')
    });
    let opt = { headers: headers }
    return this.http.get('http://192.168.100.24:5000/api/land-tax/position-holders', opt);
  }

  lTaxCl(data: any): void {
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
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      let fileName = 'LTC_' + data.pin + '_' + data.current_date +'.docx';
      saveAs(out, fileName);
    })
  }
}