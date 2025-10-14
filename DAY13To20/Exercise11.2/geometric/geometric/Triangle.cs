using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geometric
{
    class Triangle : Shape

    {
        public double Base { get; set; }
        public double Height { get; set; }
        public double side1 { get; set; }
        public double side2 { get; set; }
        public double side3 { get; set; }

        public Triangle(double Base, double height,double side1,double side2,double side3)
        {
            this.Base = Base;
            this.Height = Height;
            this.side1 = side1;
            this.side2 = side2;
            this.side3 = side3;
        }
        public override double GetArea()
        {
            Console.WriteLine("Area of Triangle :");

            return 0.5 * Height * Base;
        }
        public override double GetPerimeter()
        {
            Console.WriteLine("Perimeter of Triangle :");

            return side1+side2+side3 ;
        }

    }
}
