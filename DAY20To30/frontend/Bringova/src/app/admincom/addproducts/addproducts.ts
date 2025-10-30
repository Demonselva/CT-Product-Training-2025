import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproducts',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './addproducts.html',
  styleUrl: './addproducts.css',
})
export class Addproducts {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      offer_price: [null],
      product_description: [''],
      stock:['']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      let productData = this.productForm.value;

      if (!productData.offer_price) {
        productData.offer_price = null;
      }

      console.log('🟢 Product Data to Send:', productData);

      this.productService.addProduct(productData).subscribe({
        next: (res) => {
          alert('✅ Product added successfully!');
          this.productForm.reset();
        },
        error: (err) => {
          console.error('❌ Error adding product:', err);
          alert('Failed to add product. Try again.');
        }
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

}
