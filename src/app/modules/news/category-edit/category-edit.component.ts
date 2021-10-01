import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../_models/category.model';
import { CategoriesService } from '../_services/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryId: string = '';
  categoryForm: FormGroup;
  categoryModel!: Category;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = id;
      this.categoriesService.getById(id).subscribe(response => {
        this.categoryModel = response.data;
        this.categoryForm.setValue({ name: this.categoryModel.name });
      });
    }
  }

  returnToMainPage(): void {
    this.router.navigate(['/news/categories']);
  }

  save(): void {
    this.categoryModel = Object.assign({}, this.categoryForm.value);

    if (this.categoryId === '') {
      this.create();
    } else {
      this.update();
    }
  }

  update() {
    this.categoryModel._id = this.categoryId;
    this.categoriesService.update(this.categoryId, this.categoryModel).subscribe(response => {
      this.returnToMainPage();
    });
  }

  create() {
    this.categoriesService.create(this.categoryModel).subscribe(response => {
      this.returnToMainPage();
    });
  }

}
