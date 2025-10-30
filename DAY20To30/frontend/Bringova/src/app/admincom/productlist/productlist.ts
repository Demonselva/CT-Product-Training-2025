import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import{Product} from '../../Model/Product';

@Component({
  selector: 'app-productlist',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './productlist.html',
  styleUrl: './productlist.css',
})
export class Productlist implements OnInit {
 productList: Product[] = [];
  editForm!: FormGroup;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();

   
    this.editForm = this.fb.group({
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      offer_price: [null],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: ['', Validators.required]
    });
  }

  loadData(): void {
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.productList = res;
      },
      error: (err) => {
        console.error('❌ Error loading product list', err);
        alert('Error loading product list');
      }
    });
  }


  closeModal(): void {
    const modal = document.getElementById('editProductModal');
    if (modal) {
      (modal as any).style.display = 'none';
    }
    this.selectedProduct=null;
    this.editForm.reset();
  }


  editProduct(product: Product): void {
    this.selectedProduct = product;

    this.editForm.patchValue({
      product_name: product.product_name,
      product_description: product.product_description,
      offer_price: product.offer_price || null,
      price: product.price,
      stock: product.stock
    });

   this.openModal()
  }

  saveChanges(): void {
    if (this.editForm.invalid || !this.selectedProduct) {
      alert('⚠️ Please fill all required fields correctly.');
      return;
    }
   

    const updatedProduct: Product = {
      ...this.selectedProduct,
      ...this.editForm.value,
      product_edited_date: new Date().toISOString()
    };

    this.productService
      .updateProduct(this.selectedProduct.product_id, updatedProduct)
      .subscribe({
        next: () => {
          alert('✅ Product updated successfully!');
          this.loadData();
          this.closeModal();
        },
        error: (err) => {
          console.error('❌ Error updating product', err);
          alert('Error updating product. Try again.');
        }
      });
  }

 
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProducts(id).subscribe({
        next: () => {
          alert(`🗑️ Successfully deleted product with ID ${id}`);
          this.loadData();
        },
        error: (err) => {
          console.error('❌ Error deleting product', err);
          alert('Error deleting product.');
        }
      });
    }
  }
openModal(): void {
  const modal = document.getElementById('editProductModal');
  if (modal) {
    modal.style.display = 'block';
   
  }
}



}

