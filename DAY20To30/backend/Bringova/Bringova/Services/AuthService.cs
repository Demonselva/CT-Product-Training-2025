using Microsoft.Data;
using Microsoft.Data.SqlClient;
using Bringova.Models;
using BCrypt.Net;

namespace Bringova.Services
{
    public class AuthService
    {
        private readonly string _connectionString;

        public AuthService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShopDB");
        }

      
        public bool RegisterUser(RegisterRequest request)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.password);

                string query = @"INSERT INTO Users 
                                (username, email, password, dob, gender, mobile_number)
                                VALUES (@username, @Email, @Password, @Dob, @Gender, @Mobile)";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@username", request.username ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Email", request.email ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Password", hashedPassword);
                cmd.Parameters.AddWithValue("@Dob", request.dob ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Gender", request.gender ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Mobile", request.mobile_number ?? (object)DBNull.Value);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }

     
        public User? ValidateUser(LoginRequest request)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Users WHERE email = @Email";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Email", request.email);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    string storedHash = reader["password"].ToString()!;
                    if (BCrypt.Net.BCrypt.Verify(request.password, storedHash))
                    {
                        return new User
                        {
                            user_id = Convert.ToInt32(reader["user_id"]),
                            username = reader["username"].ToString(),
                            email = reader["email"].ToString(),
                            gender = reader["gender"] as string,
                            dob = reader["dob"] as DateTime?,
                            mobile_number = reader["mobile_number"] as string,
                            user_added_date = reader["user_added_date"] as DateTime?
                        };
                    }
                }
                return null;
            }
        }

   
        public List<User> GetAllUsers()
        {
            var users = new List<User>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Users ORDER BY user_added_date DESC";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new User
                    {
                        user_id = Convert.ToInt32(reader["user_id"]),
                        username = reader["username"].ToString(),
                        email = reader["email"].ToString(),
                        gender = reader["gender"] as string,
                        dob = reader["dob"] as DateTime?,
                        mobile_number = reader["mobile_number"] as string,
                        user_added_date = reader["user_added_date"] as DateTime?
                    });
                }
            }
            return users;
        }

  
        public User? GetUserById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Users WHERE user_id = @Id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    return new User
                    {
                        user_id = Convert.ToInt32(reader["user_id"]),
                        username = reader["username"].ToString(),
                        email = reader["email"].ToString(),
                        gender = reader["gender"] as string,
                        dob = reader["dob"] as DateTime?,
                        mobile_number = reader["mobile_number"] as string,
                        user_added_date = reader["user_added_date"] as DateTime?
                    };
                }
                return null;
            }
        }

        public bool UpdateUser(int id, User user)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = @"UPDATE Users SET 
                                username = @username,
                                email = @Email,
                                dob = @Dob,
                                gender = @Gender,
                                mobile_number = @Mobile
                                WHERE user_id = @Id";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@username", user.username ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Email", user.email ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Dob", user.dob ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Gender", user.gender ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@Mobile", user.mobile_number ?? (object)DBNull.Value);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }

       
        public bool DeleteUser(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "DELETE FROM Users WHERE user_id = @Id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }
        public bool UpdatePassword(int id, string currentPassword, string newPassword)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

               
                string getPassQuery = "SELECT password FROM Users WHERE user_id = @Id";
                SqlCommand getCmd = new SqlCommand(getPassQuery, conn);
                getCmd.Parameters.AddWithValue("@Id", id);

                var existingHash = getCmd.ExecuteScalar()?.ToString();

                if (string.IsNullOrEmpty(existingHash))
                    return false;

                
                bool isValid = BCrypt.Net.BCrypt.Verify(currentPassword, existingHash);
                if (!isValid)
                    return false; 

                
                string newHashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

                
                string updateQuery = "UPDATE Users SET password = @Password WHERE user_id = @Id";
                SqlCommand updateCmd = new SqlCommand(updateQuery, conn);
                updateCmd.Parameters.AddWithValue("@Password", newHashedPassword);
                updateCmd.Parameters.AddWithValue("@Id", id);

                int rows = updateCmd.ExecuteNonQuery();
                return rows > 0;
            }
        }
    }
}
