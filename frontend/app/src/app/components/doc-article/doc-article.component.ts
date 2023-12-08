import { Component, Input } from '@angular/core';
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
}
