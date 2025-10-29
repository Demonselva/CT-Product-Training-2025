using Bringova.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Bringova.Services
{
    public class ProductService
    {
        private readonly string _connectionString;

        public ProductService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ShopDB");
        }

        // ✅ Add new product
        public bool AddProduct(Product product)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = @"INSERT INTO Products 
                                (product_name, product_description, offer_price, price, stock)
                                VALUES (@name, @desc, @offer, @price, @stock)";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@name", product.product_name);
                cmd.Parameters.AddWithValue("@desc", (object?)product.product_description ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@offer", (object?)product.offer_price ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@price", product.price);
                cmd.Parameters.AddWithValue("@stock", product.stock);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }

        // ✅ Get all products
        public List<Product> GetAllProducts()
        {
            List<Product> list = new List<Product>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Products ORDER BY product_added_date DESC";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Product p = new Product
                    {
                        product_id = Convert.ToInt32(reader["product_id"]),
                        product_name = reader["product_name"].ToString(),
                        product_description = reader["product_description"] as string,
                        offer_price = reader["offer_price"] as decimal?,
                        price = Convert.ToDecimal(reader["price"]),
                        stock = reader["stock"].ToString(),
                        product_added_date = reader["product_added_date"] as DateTime?,
                        product_edited_date = reader["product_edited_date"] as DateTime?
                    };
                    list.Add(p);
                }
            }
            return list;
        }

        // ✅ Get product by ID
        public Product? GetProductById(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Products WHERE product_id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    return new Product
                    {
                        product_id = Convert.ToInt32(reader["product_id"]),
                        product_name = reader["product_name"].ToString(),
                        product_description = reader["product_description"] as string,
                        offer_price = reader["offer_price"] as decimal?,
                        price = Convert.ToDecimal(reader["price"]),
                        stock = reader["stock"].ToString(),
                        product_added_date = reader["product_added_date"] as DateTime?,
                        product_edited_date = reader["product_edited_date"] as DateTime?
                    };
                }
                return null;
            }
        }

        public bool UpdateProduct(int id, Product product)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = @"UPDATE Products SET 
                                product_name = @name,
                                product_description = @desc,
                                offer_price = @offer,
                                price = @price,
                                stock = @stock,
                                product_edited_date = GETDATE()
                                WHERE product_id = @id";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@name", product.product_name);
                cmd.Parameters.AddWithValue("@desc", (object?)product.product_description ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@offer", (object?)product.offer_price ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@price", product.price);
                cmd.Parameters.AddWithValue("@stock", product.stock);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }

        public bool DeleteProduct(int id)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "DELETE FROM Products WHERE product_id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                conn.Open();
                int rows = cmd.ExecuteNonQuery();
                return rows > 0;
            }
        }
    }
}
