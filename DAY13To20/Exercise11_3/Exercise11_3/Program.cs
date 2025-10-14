using System;

namespace Exercise11_3
{
    class Program
    {
        public static void Main(string[] args) 
        {
           obje_cts vehicle = new obje_cts();

           obje_cts.cars car=new obje_cts.cars() { name="ford",year=1992};
           obje_cts.bike Bike=new obje_cts.bike() { name="Ducati",model=2025};
            Objserializer serializer = new Objserializer();

            Console.WriteLine(serializer.Objectserializer(car));
            Console.WriteLine(serializer.Objectserializer(Bike));
        }
    }
}