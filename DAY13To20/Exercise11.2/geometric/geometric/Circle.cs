using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geometric
{
    class Circle : Shape

    {
        public double radius { get; set; }
        public double pi = 3.14;


        public Circle(double Radius)
        {
            this.radius = Radius;

        }
        public override double GetArea()
        {
            Console.WriteLine("Area of Circle :");
            return Math.Pow((pi * radius), 2);
        }
        public override double GetPerimeter()
        {
            Console.WriteLine("Perimeter of Circle");

            return 2 * pi * radius;
        }

    }
}
