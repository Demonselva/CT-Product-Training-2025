namespace Bringova.Models
{
    public class PasswordUpdateRequest
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
