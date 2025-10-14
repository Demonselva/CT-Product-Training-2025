using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Exercise11_3
{
    public class Objserializer
    {
        public  string Objectserializer(object obj) 
        {
            if (obj == null)
            {
                return "null object";

            }
              Type type = obj.GetType();
            PropertyInfo[] properties = type.GetProperties();
            string result = $"Type : {type.Name}\n";
            foreach (PropertyInfo property in properties) 
            {
                object value = property.GetValue(obj, null);
                result += $"{property.Name} : {value}\n";
            }
            return result ;
        }
    }
}
