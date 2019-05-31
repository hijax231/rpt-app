import { Injectable } from '@angular/core';
import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver'; 
@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {

  URL: string = '../assets/temp/clearance_template.docx';

  loadFile(url: any, callback: any) {
    JSZipUtils.getBinaryContent(url, callback);
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
      saveAs(out, 'output.docx');
    })
  }
}