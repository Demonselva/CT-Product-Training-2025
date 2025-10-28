

Random random = new Random();

Console.Write("Enter the number of guesses : ");
int a = Convert.ToInt32(Console.ReadLine());


int i = 0;


while (i < a)
{
    Console.Write($"{i+1}) guess the number 1 to 100 : ");
    int guess = Convert.ToInt32(Console.ReadLine());
    int target=random.Next(1,101);
    if (guess != target)
    {
        
        Console.WriteLine($"Good Luck Next Time!! \n Random no:{target} \n Guess no={guess} ");
        if (guess < target)
        {
            Console.WriteLine("Too Low");
        }
        else
        {
            Console.WriteLine("Too High");
        }
            i++;
  
    }
    else
    {
        Console.WriteLine($"Your lucky!! \n Random no:{target} \n Guess no={guess} ");
        break;
    }
}