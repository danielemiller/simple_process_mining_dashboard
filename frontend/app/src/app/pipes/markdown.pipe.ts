// import { Pipe, PipeTransform } from '@angular/core';
// import { marked } from 'marked';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// @Pipe({
//   name: 'markdown',
//   standalone: true
// })
// export class MarkdownPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer) {}

//   transform(value: string): SafeHtml {
//     const markdownContent = marked(value);
//     return this.sanitizer.bypassSecurityTrustHtml(markdownContent);
//   }
// }