using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DAY15
    
{
    public class Bike
    {
        private string name;

        public string Name
        {
            get {  return name; }
            set { name = value; }
        }
    }
    public class Car
    {
        public string name;
        public string color;
        public Car(int a) 
        {
            name = "volvo";
            color= "red";
            Speed(a);
        }
        public void Speed(int a)
        {
            Console.WriteLine("over speed.....!"+a);
        }
    }
}
