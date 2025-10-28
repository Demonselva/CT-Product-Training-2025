using System;
using System.Timers;

namespace EventHandling

{
    public class Clock
    {
        public event EventHandler OnTick;

        public void Start()
        {
            for (int i = 0; i < 10; i++)
            {
                OnTick?.Invoke(this, EventArgs.Empty);
                Thread.Sleep(1000);
            }

        }
    }
        public class Display
        {
            public void Subscriber(Clock clock)
            {
                clock.OnTick += Displaycurrent;
            }
            public void Displaycurrent(object Sender, EventArgs e)
            {
                Console.WriteLine($"Current time :{DateTime.Now}");
            }
        }
    class Program
    {
        static void Main(string[] args)
        {
            
            var clock = new Clock();
            Display display=new Display();
            display.Subscriber(clock); 
            clock.Start();

        }
    }
}