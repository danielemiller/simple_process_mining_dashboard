import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocArticle } from '../../models/doc-article.model';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-doc-article',
  standalone: true,
  imports: [ CommonModule, MarkdownModule ],
  templateUrl: './doc-article.component.html',
  styleUrl: './doc-article.component.css',
  providers: [ MarkdownService ]
})
export class DocArticleComponent {
  @Input() article!: DocArticle;

  constructor(private router: Router) {}

  get previewContent(): string {
    return this.article.description
    // .split(" ").slice(0, 100).join(" ") + "...";
  }

  readMore(article: DocArticle): void {
    this.router.navigate(['/article', article.id]); // Adjust the route as needed
  }
}
