// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ArticleService } from '../../services/article.service';
// import { Article } from '../../models/article.model';
// import { CommonModule } from '@angular/common';
// import { SecurityContext } from '@angular/core';
// import { SECURITY_CONTEXT } from 'ngx-markdown';
// import { MarkdownModule, MarkdownService } from 'ngx-markdown';
// import { first } from 'rxjs/operators';

// @Component({
//   selector: 'app-full-article',
//   standalone: true,
//   imports: [CommonModule, MarkdownModule],
//   templateUrl: './full-article.component.html',
//   styleUrls: ['./full-article.component.css'], // Corrected to 'styleUrls'
//   providers: [MarkdownService, { provide: SECURITY_CONTEXT, useValue: SecurityContext.HTML }]
// })
// export class FullArticleComponent implements OnInit {
//   // Initialize with a default object including all properties of the Article type.
//   article: Article = {
//     id: 0, // Default value for id, assuming it's a number.
//     title: '', // Default empty string for title.
//     description: '', // Default empty string for description.
//     keywords: [], // Initialize keywords as an empty array, assuming it's an array of strings.
//     content: '', // Default empty string for content.
//     created_at: new Date().toISOString(), // Current date as ISO string for created_at.
//     updated: new Date().toISOString() // Current date as ISO string for updated.
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private articleService: ArticleService
//   ) {}

//   async ngOnInit() {
//     const articleId = this.route.snapshot.paramMap.get('id');
//     if (articleId) {
//       this.articleService.getArticleById(articleId).pipe(first()).subscribe((article) => {
//         if (article) {
//           this.article = article;
//         } else {
//           // Handle the case when the article is not found, perhaps redirect or show a message.
//           console.error(`Article with id ${articleId} not found.`);
//         }
//       }, (error) => {
//         console.error('Failed to load article', error);
//         // Handle error, show user-friendly message, etc.
//       });
//     }
//   }
// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { SecurityContext } from '@angular/core';
import { SECURITY_CONTEXT } from 'ngx-markdown';

@Component({
  selector: 'app-full-article',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MarkdownPipe],
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.css'],
  providers: [MarkdownService, { provide: SECURITY_CONTEXT, useValue: SecurityContext.HTML }]
})
export class FullArticleComponent implements OnInit {
  article: Article | null = null;
  @ViewChild('markdownContent') markdownContent!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe(article => {
        this.article = article;
      });
    }
  }

  ngAfterViewInit() {
    if (this.article && this.markdownContent) {
      this.markdownService.render(this.markdownContent.nativeElement);
    }
  }
}
