import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../_models/news.model';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  displayedColumns = ['title', 'subtitle', 'createdAt', 'publishedAt', 'action'];

  constructor(
    private newsService: NewsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.newsService.getAll().subscribe(response => {
      this.newsList = response.data;
    });
  }

  navigateToCreateNews(): void {
    this.router.navigate(['news/create']);
  }

  removeNews(id: string) {
    this.newsService.delete(id).subscribe(response => {
      this.getAll();
    });
  }

}
