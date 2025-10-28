using Exercise11_1;
using System;

namespace Excercise11_1
{
    class Program
    {
        public class app
        {
           
            private readonly Ilogger log;

            public app(Ilogger logger)
            {
                this.log = logger;

            }
            public void Run()
            {
                log.LogInfo("Logged Now");
                log.LogWarning("Logged Warning");
                log.LogError("Logging Error");
            }
        }

        public static void Main(string[] args)
        {
            Ilogger logger;

            Console.WriteLine("Select the operation:");
            Console.WriteLine("choose 1 for Console logger");
            Console.WriteLine("choose 2 for file logger");
            int choice=Convert.ToInt32(Console.ReadLine());

            if (choice == 2)
            {
                logger = new FileLogger();
              
            }
            else
            {
                logger = new ConsoleLogger();
            }

            app service=new app(logger);
            service.Run();
            if (logger is FileLogger Fileread) 
            {
                Fileread.Displayfile();
            }
            Console.WriteLine("task completed");


            
        }


    }
}