using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAY17_1_
{
    public class Math
    {
        public delegate double Calculate(int a, int b);

        public Calculate add;
        public Calculate Sub;
        public Calculate Mul;
        public Calculate Div;

        public Math() 
        {
            add=Addition;
            Sub=Subtract;
            Mul=Multiply;
            Div=Divide;
        }  
        public static double Addition(int a, int b)
        {
            double d = a + b;
            return d;
        }
        public static double Subtract(int a, int b) 
        {
            double d = a - b;
            return d;
        }
        public static double Multiply(int a, int b) 
        {
            double d = a * b;
            return d;
        }
        public static double Divide(int a, int b) 
        {
            double d = a / b;
            return d;
        }
    }
}
