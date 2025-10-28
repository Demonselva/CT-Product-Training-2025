using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geometric
{
    class Program

    {
       
        public static void Main(string[] args) 
        {
            Shape rectangle= new Rectangle(30,40);
            Shape triangle= new Triangle(10,20,10,10,10);
            Shape Circle= new Circle(20);
            List<Shape> shapes = new List<Shape>();
            shapes.Add(rectangle);
            shapes.Add(triangle);
            shapes.Add(Circle);

            foreach (Shape shape in shapes) 
            { 
                Console.WriteLine(shape.GetArea());
                Console.WriteLine(shape.GetPerimeter());
            }


        }
        

    }
}
