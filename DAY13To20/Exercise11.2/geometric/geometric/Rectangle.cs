using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geometric
{
   class Rectangle:Shape

    {
        public double length { get; set; }
        public double width { get; set; }
        
        public Rectangle(double length, double width)
        {
            this.length = length;
            this.width = width;
        }
        public override double GetArea()
        {
            Console.WriteLine("Area of Rectangle :");
            return length*width;
        }
        public override double GetPerimeter()
        {
            Console.WriteLine("Perimeter of Rectangle:");

            return 2*(length+width);
        }

    }
}
