using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Exercise11_1
{
    interface Ilogger
    {
        void LogInfo(string Message);
        void LogWarning(string Message);
        void LogError(string Message);

    }

    public class ConsoleLogger : Ilogger
    {
        public void LogInfo(string Message) { Console.WriteLine($"Logged : {Message} \n {DateTime.Now}"); }
        public void LogWarning(string Message) { Console.WriteLine($"Logging Warning : {Message} \n{DateTime.Now}"); }
        public void LogError(string Message) { Console.WriteLine($"Error  {Message}\n{DateTime.Now}"); }


    }
    class FileLogger : Ilogger
    {

       
         string filepath = Path.Combine(Environment.CurrentDirectory,"data.txt");
        public void LogInfo(string Message)
        {
            Logtofile($"logging info :{Message}");
        }
        public void LogWarning(string Message)
        {
            Logtofile($"logging Warning :{Message}");
        }
        public void LogError(string Message)
        {
            Logtofile($"logging Error :{Message}");

        }
        public void Logtofile(string message)
        {
            try
            {
                using (StreamWriter writer = new StreamWriter(filepath, append: true))
                {
                    writer.WriteLine($"date {DateTime.Now.ToString(" dd-MMM-yyyy,hh:mm:ss tt")}:{message}");
                    writer.Flush();
                }
            }
            catch (Exception ex) 
            {

                Console.WriteLine("file is not created");
             }
        }
        public void Displayfile()
        {
            try
            {
                StreamReader reader = new StreamReader(filepath);
                string Line;

                while ((Line = reader.ReadLine()) != null)
                {
                    {
                        Console.WriteLine(Line);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error ok");
            }
        }
    
       

       
      



        
    }
}
