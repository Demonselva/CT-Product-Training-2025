using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bringova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Bringova")]
    public class UserController : ControllerBase
    {
        public List<string> usersdetails = new List<string>
        {
            "car","bike","flight","van","cycle"
        };


        [HttpGet]
        public List<string> getallusers()
        {
            return usersdetails;

        }

        [HttpGet("{id}")]
        public string getallusers2(int id)
        {
            return usersdetails[id];

        }
        [HttpDelete("{id}")]
        public void deleteuser(int id) { 
             usersdetails.RemoveAt(id);
            getallusers();
        }
    }
}
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Data.SqlClient;
//using Microsoft.Extensions.Configuration;

//namespace Bringova.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [EnableCors("Bringova")]
//    public class UserController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;

//        public UserController(IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }

//        // GET: api/User
//        [HttpGet]
//        public List<User> GetAllUsers()
//        {
//            List<User> users = new List<User>();
//            string connectionString = _configuration.GetConnectionString("DefaultConnection");

//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                conn.Open();
//                string query = "SELECT Id, Name, Email, Role FROM Users";
//                SqlCommand cmd = new SqlCommand(query, conn);
//                SqlDataReader reader = cmd.ExecuteReader();

//                while (reader.Read())
//                {
//                    users.Add(new User
//                    {
//                        Id = (int)reader["Id"],
//                        Name = reader["Name"].ToString(),
//                        Email = reader["Email"].ToString(),
//                        Role = reader["Role"].ToString()
//                    });
//                }
//            }

//            return users;
//        }

//        // GET: api/User/5
//        [HttpGet("{id}")]
//        public User GetUser(int id)
//        {
//            User user = null;
//            string connectionString = _configuration.GetConnectionString("DefaultConnection");

//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                conn.Open();
//                string query = "SELECT Id, Name, Email, Role FROM Users WHERE Id=@Id";
//                SqlCommand cmd = new SqlCommand(query, conn);
//                cmd.Parameters.AddWithValue("@Id", id);

//                SqlDataReader reader = cmd.ExecuteReader();
//                if (reader.Read())
//                {
//                    user = new User
//                    {
//                        Id = (int)reader["Id"],
//                        Name = reader["Name"].ToString(),
//                        Email = reader["Email"].ToString(),
//                        Role = reader["Role"].ToString()
//                    };
//                }
//            }

//            return user;
//        }

//        // DELETE: api/User/5
//        [HttpDelete("{id}")]
//        public IActionResult DeleteUser(int id)
//        {
//            string connectionString = _configuration.GetConnectionString("DefaultConnection");

//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                conn.Open();
//                string query = "DELETE FROM Users WHERE Id=@Id";
//                SqlCommand cmd = new SqlCommand(query, conn);
//                cmd.Parameters.AddWithValue("@Id", id);

//                int rowsAffected = cmd.ExecuteNonQuery();
//                if (rowsAffected > 0)
//                    return Ok("Deleted successfully");
//                else
//                    return NotFound("User not found");
//            }
//        }
//    }

//    // User model
//    public class User
//    {
//        public int Id { get; set; }
//        public string Name { get; set; }
//        public string Email { get; set; }
//        public string Role { get; set; }
//    }
//}
