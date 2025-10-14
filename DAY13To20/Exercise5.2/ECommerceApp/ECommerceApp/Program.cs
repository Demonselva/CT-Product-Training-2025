using System;
using System.Xml.Linq;

namespace ECommerceApp
{
    class Program
    {
        public static void Main(string[] args) 
        {
            List<Product> products = new List<Product>();

            ShoppingCart cart=new ShoppingCart();
            products.Add(new Product(1, "pencil", 5, 1));
            products.Add(new Product(2, "Table", 1, 2));
            products.Add(new Product(3, "eraser", 3, 1));
            products.Add(new Product(4, "pen", 7, 5));






            bool s = true;
            while (s)
            {
                Console.WriteLine("Menu For USers ");
                Console.WriteLine("1.Display Product ");
                Console.WriteLine("2.Add to Cart ");
                Console.WriteLine("3.Remove Product");
                Console.WriteLine("4.Display cart ");
                Console.WriteLine("5.Checkout ");
                Console.WriteLine("6.Cancel ");
                int input = Convert.ToInt32(Console.ReadLine());
                switch (input)
                {
                    case 1:
                        foreach (var item in products)
                        {
                            item.DisplayProduct();
                        }
                        

                        break;
                    case 2:
                        Console.WriteLine("enter the product ID");
                        int Ide = Convert.ToInt32(Console.ReadLine());
                        Product product = products.Find(u => u.Id == Ide);
                        if (product != null)
                        {
                            cart.Addproducts(product);
                        }
                        else
                        {
                            Console.WriteLine("Invalid id");
                        }

                            break;
                    case 3:
                        Console.WriteLine("enter the product ID");
                        int idd = Convert.ToInt32(Console.ReadLine());
                        Product removeproduct = products.Find(u => u.Id == idd);
                        if (removeproduct != null)
                        {
                            cart.RemoveProduct(removeproduct.Id);
                        }
                        else
                        {

                            Console.WriteLine("Invalid id");
                        }

                        break;
                    case 4:
                        cart.Displaycart();
                        break;
                    case 5:
                        cart.Displaycart();
                        Console.WriteLine(cart.CalculateTotal());
                        break;

                    case 6:
                        s = false;
                        break;

                }
            }

        }

    }
}