using System;

namespace LambdaExpression
{
    class Program
    {
        public static void Main(string[] args)
        {
            List<int> IntegerList = new List<int>();

            for(int i = 1; i <= 10; i++)
            {
                IntegerList.Add(i);
            }

            List<int> NewList = new List<int>();

            NewList=IntegerList.FindAll(x=> x % 2== 0);

            foreach(int i in NewList)
            {
                Console.WriteLine(i);
            }

        }
    }
}