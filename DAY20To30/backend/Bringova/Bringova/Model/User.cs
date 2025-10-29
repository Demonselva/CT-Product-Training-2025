namespace Bringova.Models
{
    public class User
    {
        public int user_id { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public DateTime? dob { get; set; }
        public string? gender { get; set; }
        public string? mobile_number { get; set; }
        public DateTime? user_added_date { get; set; }
    }
}
