using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceApp
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity{ get; set; }

        public Product(int id,String name,int price,int quantity){
            Id = id;
            Name = name;
            Price = price;
            Quantity = quantity;
            }
        public void DisplayProduct()

        {
                Console.WriteLine("----------*----------");
                Console.Write("id  : " +Id + " ");
                Console.Write("name : " + Name + " ");
                Console.Write("Price : " + Price + " ");
                Console.WriteLine("Quantity : " +Quantity + " ");
                Console.WriteLine("----------*----------");
            

        }

    }
}
