import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_models/category.model';
import { CategoriesService } from '../_services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesList: Category[] = [];
  displayedColumns = ['id', 'name', 'action'];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.categoriesService.getAll().subscribe(response => {
      this.categoriesList = response.data;
    });
  }

  navigateToCreateCategory(): void {
    this.router.navigate(['news/categories/create']);
  }

  removeCategory(id: string) {
    this.categoriesService.delete(id).subscribe(response => {
      this.getAll();
    });
  }

}
