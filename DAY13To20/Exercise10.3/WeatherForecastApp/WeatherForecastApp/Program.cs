using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Runtime.InteropServices.JavaScript;
using Newtonsoft.Json.Linq;
using WeatherForecastApp;

namespace WeatherForcastApp
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            HttpClient client = new HttpClient();
            try
            {

                Console.WriteLine("Enter the City to find Weather :");

                string InputLine = Console.ReadLine();
                string[] Cities = InputLine.Split(",");
                string API = "bc419f093e07405eb1041747252909";

                Weatherservice weatherservice = new Weatherservice(API);
                List<Task<WeatherReport>> tasks = new List<Task<WeatherReport>>();

                foreach (String City in Cities) 
                { 
                    String CityName = City.Trim();
                   

                    tasks.Add(weatherservice.GetWeatherReportAsync(CityName));
                  
                }
                WeatherReport[] result =await Task.WhenAll(tasks);

                foreach (WeatherReport weather in result) 
                {
                    Console.WriteLine($"Name : {weather.Name}");
                    Console.WriteLine($"Temperature : {weather.Temperature}");
                    Console.WriteLine($"Humidity : {weather.Humidity}");
                    Console.WriteLine($"Conditon : {weather.Condition}");
                    Console.WriteLine($"--------------------END---------------");
                }




            }

            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Could not find {ex.Message}");
            }
            

        }
    }
}