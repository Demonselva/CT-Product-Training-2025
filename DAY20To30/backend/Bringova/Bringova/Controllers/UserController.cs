using Bringova.Models;
using Bringova.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Bringova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Bringova")]
    public class UserController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly string _connectionString;

        public UserController(AuthService authService, IConfiguration _configuration)
        {
            _authService = authService;
            _connectionString = _configuration.GetConnectionString("ShopDB");
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.password))
                return BadRequest("Email and Password are required");

            bool success = _authService.RegisterUser(request);
            if (success)
                return Ok(new { message = "User registered successfully" });

            return BadRequest("Registration failed");
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _authService.ValidateUser(request);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });

            return Ok(new
            {
                message = "Login successful",
                user
            });
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _authService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _authService.GetUserById(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            bool success = _authService.UpdateUser(id, user);
            if (success)
                return Ok(new { message = "User updated successfully" });

            return BadRequest(new { message = "Update failed" });
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            bool success = _authService.DeleteUser(id);
            if (success)
                return Ok(new { message = "User deleted successfully" });

            return NotFound(new { message = "User not found" });
        }
        [HttpPut("update-password/{id}")]
        public IActionResult UpdatePassword(int id, [FromBody] PasswordUpdateRequest request)
        {
            var result = _authService.UpdatePassword(id, request.CurrentPassword, request.NewPassword);

            if (!result)
                return BadRequest(new { message = "Invalid current password or user not found" });

            return Ok(new { message = "Password updated successfully" });
        }


        [HttpGet("check-user")]
        public IActionResult CheckUser(string email, string username)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT COUNT(*) FROM Users WHERE email = @Email OR username = @Username";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Username", username);
                conn.Open();
                int count = (int)cmd.ExecuteScalar();

                return Ok(new { exists = count > 0 });
            }
        }
    }
}
