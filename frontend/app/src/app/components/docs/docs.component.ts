import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocArticleComponent } from '../doc-article/doc-article.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { SecurityContext } from '@angular/core';
import { SECURITY_CONTEXT } from 'ngx-markdown';


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

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }
}