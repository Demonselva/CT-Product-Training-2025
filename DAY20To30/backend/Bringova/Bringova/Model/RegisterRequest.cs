namespace Bringova.Models
{
    public class RegisterRequest
    {
        public string? username { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public DateTime? dob { get; set; }
        public string? gender { get; set; }
        public string? mobile_number { get; set; }
    }
}
