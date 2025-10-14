using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace WeatherForecastApp
{
    internal class Weatherservice
    {

        private readonly string ApiKey;
        private readonly HttpClient client;
        public Weatherservice(string API)
        {
            ApiKey = API;
            client = new HttpClient();
        }
        public async Task<WeatherReport> GetWeatherReportAsync(string City)
        {
            try
            {
                string CityName = City;
                string URL = $"https://api.weatherapi.com/v1/current.json?key={ApiKey}&q={CityName}";
               
                HttpResponseMessage response = await client.GetAsync(URL);
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();

                JObject data = JObject.Parse(json);

                string Name = data["location"]["name"].ToString();
                double Temperature = data["current"]["temp_c"].ToObject<double>();
                int Humidity = data["current"]["humidity"].ToObject<int>();
                string Condition = data["current"]["condition"]["text"].ToString();

                return new WeatherReport
                {
                    Name = Name,
                    Temperature = Temperature,
                    Humidity = Humidity,
                    Condition = Condition,
                };


            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("Error on fteching : " + ex.Message);
                return null;
            }
        }
    }
            
}

    

