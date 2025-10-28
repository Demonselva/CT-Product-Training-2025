using System;

namespace DAY16
{
    class Program
    {
        static void Main(string[] args)
        {
            Division division = new Division();
            Console.Write("enter the number A:");
            int a=Convert.ToInt32(Console.ReadLine());
            
            Console.Write("enter the number B:");
            int b = Convert.ToInt32(Console.ReadLine());
            try
            {
                double r=division.Divide(a, b);
                Console.WriteLine($"{a} Divided by {b} gives {r}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"{a} can't be divided by {b}");
            }
            finally
            {
                Console.Write(" try and catch executed!");
            }
            
        }
    }
}
