import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { Category } from '../../category/category';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-product-add-2',
  templateUrl: './product-add-2.component.html',
  styleUrl: './product-add-2.component.css',
  providers: [CategoryService,ProductService],
})
export class ProductAdd2Component implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService:ProductService,
    private alertifyService:AlertifyService
  ) {}

  productAddForm: FormGroup;
  product: Product = new Product();
  categories: Category[];
  createproductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createproductAddForm();
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  add() {
    if (this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm.value);
    }

    this.productService.addProduct(this.product).subscribe((data) => {
      this.alertifyService.success(data.name + ' başarıyla eklendi');
    });
  }
}
