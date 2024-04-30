import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../category/category';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-product-add-1',
  templateUrl: './product-add-1.component.html',
  styleUrl: './product-add-1.component.css',
  providers: [CategoryService, ProductService],
})
export class ProductAdd1Component implements OnInit {
  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private alertifyService: AlertifyService
  ) {}
  model: Product = new Product();

  add(form: NgForm) {
    this.productService.addProduct(this.model).subscribe((data) => {
      this.alertifyService.success(data.name + ' başarıyla eklendi');
    });
  }
}
