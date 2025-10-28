using System;

namespace DAY17
{
    class Program
    {
        static void Main(string[] args)
        {
            StudentLists<String> studentLists = new StudentLists<String>();
            studentLists.Push("selva");
            studentLists.Push("ramu");
            studentLists.Push("Ramya");
            studentLists.Push("muthu");
            
            Console.WriteLine("--------------Stack ------------------");

            foreach (var student in studentLists.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------First Pop ------------------");
            studentLists.Pop();
            foreach (var student in studentLists.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------Second Pop ------------------");
            studentLists.Pop();
            foreach (var student in studentLists.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------peek Element ------------------");
            studentLists.peek();


            StudentLists<int> studentIdList=new StudentLists<int>();
            studentIdList.Push(1);
            studentIdList.Push(2);
            studentIdList.Push(3);
            studentIdList.Push(4);
            Console.WriteLine("--------------Stack ------------------");

            foreach (var student in studentIdList.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------First Pop ------------------");
            studentIdList.Pop();
            foreach (var student in studentIdList.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------Second Pop ------------------");
            studentIdList.Pop();
            foreach (var student in studentIdList.studentlist) { Console.WriteLine(student); }
            Console.WriteLine("--------------peek Element ------------------");
            studentIdList.peek();


        }
    }
}
