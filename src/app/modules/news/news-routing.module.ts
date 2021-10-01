import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component'
import { CategoriesComponent } from './categories/categories.component'
import { NewsEditComponent } from './news-edit/news-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
    {
      path: '',
      component: NewsComponent
    },
    {
      path: 'create',
      component: NewsEditComponent
    },
    {
      path: 'update/:id',
      component: NewsEditComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'categories/create',
        component: CategoryEditComponent
    },
    {
        path: 'categories/edit/:id',
        component: CategoryEditComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
