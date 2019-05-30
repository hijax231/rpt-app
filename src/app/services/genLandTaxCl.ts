import { Injectable } from '@angular/core';
import { JSZip } from 'jszip'
import { Docxtemplater } from 'docxtemplater'
import * as fs from 'fstream'

@Injectable({
  providedIn: 'root'
})

export class genLandTaxCl {
   lTaxCl(data: any) {
      let cont = fs.readFileSync('../assets/temp/clearance_template.docx');
      let zip = new JSZip(cont);
      let doc = new Docxtemplater();
      doc.loadZip(zip);
      doc.setData(data);
      try {
         doc.render();
      } catch (e) {
         console.log(JSON.stringify({error: e}))
         throw e;
      }
      let buf = doc.getZip().generate({
         type: 'blob',
         mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      fs.writeFileSync('../assets/temp','output.docx');
      
   }
}