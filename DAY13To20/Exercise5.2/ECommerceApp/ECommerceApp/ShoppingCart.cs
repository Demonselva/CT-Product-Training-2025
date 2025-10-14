using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceApp
{
    public class ShoppingCart
    {
        public List<Product> CartItems = new List<Product>();
        public void Addproducts(Product product)
        {
            CartItems.Add(product);
            Console.Write($"{product.Name} Added to cart successfully");

            
        }
       
        public void RemoveProduct(int id) 
        {
            Product removeitem = CartItems.Find(u => u.Id == id);
            if (removeitem != null)
            {
                CartItems.Remove(removeitem);
                Console.WriteLine($"{removeitem.Name} has been removed ");
            }
            else
            {
                Console.WriteLine("Product not found");
            }
        }

        public void Displaycart()
        {
            if (CartItems.Count == 0)
            {
                Console.WriteLine("cart is empty");
                return;
            }
            Console.WriteLine("new cart items");
            foreach(var item in CartItems)
            {
                item.DisplayProduct();
            }
            
        }
        public double CalculateTotal()
        {
            
            double total = 0;
            Console.WriteLine("Total");
            foreach (var item in CartItems)
            {
                total += item.Price * item.Quantity;
                
            }
            return total;

        }

    }
}
