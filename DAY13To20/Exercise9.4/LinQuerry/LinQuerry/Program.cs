using System;
using System.Linq;

namespace LinQuerry
{
    class Program 
    {
        public static void Main(string[] args)
        {

            List<Products> ProductList = new List<Products>();
            //Console.WriteLine("Add product in \n NAME \n CATEGORY \nPRICE");

            //for(int i=1; i < 3; i++) {
            //    Console.WriteLine($"Add the Product number : {i}  ");

            //    string name = Console.ReadLine();
            //    string category = Console.ReadLine();
            //    double price = Convert.ToDouble(Console.ReadLine());
            ProductList.Add(new Products() { Id = 1, Name = "Apple", Category = "Fruit", Price = 90 });
            ProductList.Add(new Products() { Id = 2, Name = "Bannana", Category = "Fruit", Price = 33.2 });
            ProductList.Add(new Products() { Id = 3, Name = "Onion", Category = "Vegetables", Price = 33.2 });
            ProductList.Add(new Products() { Id = 4, Name = "Carrect", Category = "Vegetables", Price = 39 });
            ProductList.Add(new Products() { Id = 5, Name = "Orange", Category = "Fruit", Price = 43 });

            //}

            var groupByCategory = from p in ProductList
                                  group p by p.Category into g
                                  orderby g.Count() descending
                                  select new { Category = g.Key,
                                      count=g.Count(),
                                      avg_price=g.Average(x=>x.Price)}
                                  ;




            //var catrgory = ProductList.GroupBy(g => g.Category).Select(g=>g.Key);

            foreach (var item in groupByCategory)
            {
                Console.WriteLine(item);
            }









        }
    }
}

