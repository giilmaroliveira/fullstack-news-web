import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@NgModule({
  declarations: [
    NewsComponent,
    CategoriesComponent,
    NewsEditComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
