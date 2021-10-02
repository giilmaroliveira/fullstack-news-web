import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../_models/category.model';
import { News } from '../_models/news.model';
import { CategoriesService } from '../_services/categories.service';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  newsId: string = '';
  newsForm: FormGroup;
  newsModel: News = {
    _id: '',
    title: '',
    subtitle: '',
    content: '',
    state: '',
    image: '',
    categories: []
  };

  categoriesList: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private categoriesService: CategoriesService
  ) {
    this.newsForm = this.formBuilder.group({
      title: [''],
      subtitle: [''],
      content: [''],
      image: [''],
      categories: ['']
    });
    this.getAllCategories();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsId = id;
      this.newsService.getById(id).subscribe(response => {
        this.newsModel = response.data;
        this.createForm(this.newsModel);
      });
    }
  }

  returnToMainPage(): void {
    this.router.navigate(['/news']);
  }

  createForm(news: News) {
    const categories = news.categories != null && news.categories.length > 0 ? news.categories.map(x => x._id) : [];

    const formData = {
      title: news.title,
      subtitle: news.subtitle,
      content: news.content,
      image: news.image,
      categories: categories
    };

    this.newsForm.setValue(formData);
  }

  save(): void {
    this.newsModel = Object.assign({}, this.newsForm.value);

    const categories = this.newsForm.controls['categories'].value as string[];

    this.newsModel.categories = [];

    categories.forEach(item => {
      const category = this.categoriesList.find(x => x._id === item) as Category;
      this.newsModel.categories.push(category);
    });

    if (this.newsId === '') {
      this.create();
    } else {
      this.update();
    }
  }

  update() {
    this.newsModel._id = this.newsId;
    this.newsService.update(this.newsId, this.newsModel).subscribe(response => {
      this.returnToMainPage();
    });
  }

  create() {
    this.newsService.create(this.newsModel).subscribe(response => {
      this.returnToMainPage();
    });
  }

  private getAllCategories(): void {
    this.categoriesService.getAll().subscribe(response => {
      this.categoriesList = response.data;
    });
  }

}
