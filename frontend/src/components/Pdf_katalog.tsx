import * as React from "react";
import {  generate,BLANK_PDF } from '@pdfme/generator';
import { Template, Designer } from '@pdfme/ui';
const Pdf_katalog: any = () => {
    const domContainer = document.getElementById('test')!;
    // const domContainer = document.getElementById('test');
    const pobierzZdjecie = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const responseblob = await response.blob();
      const reader = new FileReader();
    
      return new Promise<string>(resolve => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(responseblob);
      });
    };
const template: Template = {
    basePdf: "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDM4Cj4+CnN0cmVhbQp4nCvkMlAwUDC1NNUzMVGwMDHUszRSKErlCtfiyuMK5AIAXQ8GCgplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNTk1LjQ0IDg0MS45Ml0KL1Jlc291cmNlcyA8PAo+PgovQ29udGVudHMgNSAwIFIKL1BhcmVudCAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL3RyYXBwZWQgKGZhbHNlKQovQ3JlYXRvciAoU2VyaWYgQWZmaW5pdHkgRGVzaWduZXIgMS4xMC40KQovVGl0bGUgKFVudGl0bGVkLnBkZikKL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMDEwNjE0MDg1OCswOScwMCcpCi9Qcm9kdWNlciAoaUxvdmVQREYpCi9Nb2REYXRlIChEOjIwMjIwMTA2MDUwOTA5WikKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1NpemUgNwovUm9vdCAxIDAgUgovSW5mbyAzIDAgUgovSUQgWzwyODhCM0VENTAyOEU0MDcyNERBNzNCOUE0Nzk4OUEwQT4gPEY1RkJGNjg4NkVERDZBQUNBNDRCNEZDRjBBRDUxRDlDPl0KL1R5cGUgL1hSZWYKL1cgWzEgMiAyXQovRmlsdGVyIC9GbGF0ZURlY29kZQovSW5kZXggWzAgN10KL0xlbmd0aCAzNgo+PgpzdHJlYW0KeJxjYGD4/5+RUZmBgZHhFZBgDAGxakAEP5BgEmFgAABlRwQJCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjUzMgolJUVPRgo="
    ,
    schemas: [
      {
        
        nazwa_strony: {
            type: "text",
        position: {
                x: 4.95,
                y: 11.11
            },
            width: 202.65,
            height: 26.37,
            fontSize: 36,
        },
        numer_strony: {
            type: "text",
            position: {
                x: 180.93,
                y: 268.82
            },
            width: 35,
            height: 7,
            alignment: "center",
            fontSize: 13,
            characterSpacing: 0,
            lineHeight: 1
        },
        image: {
          type: "image",
          position: {
              x: 5.29,
              y: 41.27
          },
          width: 201.68,
          height: 226.29,
      },
    
        
        
      },
    ],
  };

pobierzZdjecie("http://localhost:8000/api/images/8756b894b223471f9d5338d6252ac668.JPEG")
  .then(zdjeciebase64 => {
    const inputs = [{ a: 'a1', b: 'b1', c: 'c1',nazwa_strony:'test Nazwa strona' ,numer_strony:'152',image:zdjeciebase64},
    { a: 'a1', b: 'b1', c: 'c1',nazwa_strony:'test Nazwa strona' ,numer_strony:'152',image:zdjeciebase64}];
    generate({ template, inputs }).then((pdf) => {
        console.log(pdf)
        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    });
  });
  
    return (
        <>
     <div>
     
      <p>
        Page 1
      </p>
    </div>
    </>
    )
}

  export default  Pdf_katalog

  