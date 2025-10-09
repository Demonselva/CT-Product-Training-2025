using System;

namespace DAY15
{
    class Program
    {
        static void Main(string[] args)
        {

            Car car= new Car(20);
            String python = "python";
            car.name = "TATA";

            Console.WriteLine(car.name);
            Console.WriteLine(car.color);

            //properties set get
            Bike bike = new Bike();
            bike.Name = "Yamaha";
            Console.WriteLine(bike.Name);
            
        }
           
    }
}
