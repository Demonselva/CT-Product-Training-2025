using Bringova.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Bringova.Services
{
    public class OrderService
    {
        private readonly string _connectionString;

        public OrderService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShopDB");
        }

        public bool AddOrder(Order order)
        {
            using SqlConnection con = new SqlConnection(_connectionString);
            string query = @"INSERT INTO Orders (user_id, product_id, address, payment_method, payment_status, delivery_status,total_price,quantity, message, message_date)
                             VALUES (@user_id, @product_id, @address, @payment_method, @payment_status, @delivery_status,@Total_Price,@Quantity, @message, @message_date)";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@user_id", order.user_id);
            cmd.Parameters.AddWithValue("@product_id", order.product_id);
            cmd.Parameters.AddWithValue("@address", order.address ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@payment_method", order.payment_method ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@payment_status", order.payment_status ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@delivery_status", order.delivery_status ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Total_Price", order.Total_Price ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@Quantity", order.Quantity ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@message", order.message ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@message_date", order.message_date ?? DateTime.Now);

            con.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0;
        }

     
        public List<Order> GetAllOrders()
        {
            List<Order> orders = new List<Order>();
            using SqlConnection con = new SqlConnection(_connectionString);
            string query = @"SELECT o.*, u.username, u.email, p.product_name, p.price 
                             FROM Orders o 
                             JOIN Users u ON o.user_id = u.user_id
                             JOIN Products p ON o.product_id = p.product_id
                             ORDER BY o.order_date DESC";

            SqlCommand cmd = new SqlCommand(query, con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                orders.Add(new Order
                {
                    order_id = (int)reader["order_id"],
                    user_id = (int)reader["user_id"],
                    product_id = (int)reader["product_id"],
                    address = reader["address"].ToString(),
                    payment_method = reader["payment_method"].ToString(),
                    payment_status = reader["payment_status"].ToString(),
                    delivery_status = reader["delivery_status"].ToString(),
                    Total_Price = Convert.ToInt32(reader["total_price"]),
                    Quantity = Convert.ToInt32(reader["quantity"]),
                    message = reader["message"].ToString(),
                    message_date = reader["message_date"] as DateTime?,
                    order_date = reader["order_date"] as DateTime?,
                    user = new User
                    {
                        username = reader["username"].ToString(),
                        email = reader["email"].ToString()
                    },
                    product = new Product
                    {
                        product_name = reader["product_name"].ToString(),
                        price = Convert.ToDecimal(reader["price"])
                    }
                });
            }

            return orders;
        }

    
        public List<Order> GetOrdersByUserId(int userId)
        {
            List<Order> orders = new List<Order>();
            using SqlConnection con = new SqlConnection(_connectionString);
            string query = @"SELECT o.*, u.username, u.email, p.product_name, p.price 
                             FROM Orders o 
                             JOIN Users u ON o.user_id = u.user_id
                             JOIN Products p ON o.product_id = p.product_id
                             WHERE o.user_id = @userId";

            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@userId", userId);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                orders.Add(new Order
                {
                    order_id = (int)reader["order_id"],
                    user_id = (int)reader["user_id"],
                    product_id = (int)reader["product_id"],
                    address = reader["address"].ToString(),
                    payment_method = reader["payment_method"].ToString(),
                    payment_status = reader["payment_status"].ToString(),
                    delivery_status = reader["delivery_status"].ToString(),
                    Total_Price = Convert.ToInt32(reader["total_price"]),
                    Quantity = Convert.ToInt32(reader["quantity"]),
                    message = reader["message"].ToString(),
                    message_date = reader["message_date"] as DateTime?,
                    order_date = reader["order_date"] as DateTime?,
                    user = new User
                    {
                        username = reader["username"].ToString(),
                        email = reader["email"].ToString()
                    },
                    product = new Product
                    {
                        product_name = reader["product_name"].ToString(),
                        price = Convert.ToDecimal(reader["price"])
                    }
                });
            }

            return orders;
        }

        public bool DeleteOrder(int id)
        {
            using SqlConnection con = new SqlConnection(_connectionString);
            string query = "DELETE FROM Orders WHERE order_id = @id";
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@id", id);
            con.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0;
        }
        public bool UpdateOrder(Order order)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = @"UPDATE Orders 
                         SET user_id = @UserId,
                             product_id = @ProductId,
                             address = @Address,
                             payment_method = @PaymentMethod,
                             payment_status = @PaymentStatus,
                             quantity = @Quantity,
                             total_price = @TotalPrice
                         WHERE order_id = @OrderId";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@OrderId", order.order_id);
                cmd.Parameters.AddWithValue("@UserId", order.user_id);
                cmd.Parameters.AddWithValue("@ProductId", order.product_id);
                cmd.Parameters.AddWithValue("@Address", order.address);
                cmd.Parameters.AddWithValue("@PaymentMethod", order.payment_method);
                cmd.Parameters.AddWithValue("@PaymentStatus", order.payment_status);
                cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                cmd.Parameters.AddWithValue("@TotalPrice", order.Total_Price);

                conn.Open();
                int rowsAffected = cmd.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }

    }
}
