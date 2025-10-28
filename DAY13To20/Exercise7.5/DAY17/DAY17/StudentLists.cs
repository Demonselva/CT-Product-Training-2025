using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAY17
{
    public class StudentLists<T>
    {
        public List<T> studentlist = new List<T>();
        public void Push(T item)
        {
            studentlist.Add(item);
            
        }
       
        public void Pop() 
        {
            if (studentlist.Count!=0)
            {
                Console.WriteLine($"{studentlist[studentlist.Count - 1]} removed from the Student list");
                Console.WriteLine("---------------****------------------");
                studentlist.RemoveAt(studentlist.Count - 1);
               
            }
            else
            {
                Console.WriteLine($"student list is Empty");
                Console.WriteLine("---------------****------------------");

            }
           
        }
        public void peek() 
        {
           
            Console.WriteLine("Top Element");
            Console.WriteLine(studentlist[0]);

        }
    }
}
