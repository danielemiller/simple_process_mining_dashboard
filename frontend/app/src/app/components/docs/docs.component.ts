import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocArticleComponent } from '../doc-article/doc-article.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { SecurityContext } from '@angular/core';
import { SECURITY_CONTEXT } from 'ngx-markdown';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [ CommonModule, DocArticleComponent ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
  providers: [
    { provide: SECURITY_CONTEXT, useValue: SecurityContext.HTML }
  ]
})
export class DocsComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService, private router:Router) {}

  viewArticle(articleId: number): void {
    this.router.navigate(['/article', articleId.toString()]); // Convert number to string
  }

  async ngOnInit() {
    this.articleService.getArticles().pipe(first()).subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (error) => {
        console.error('Failed to load articles', error);
        // Handle error, show user-friendly message, etc.
      }
    });
  }
}


