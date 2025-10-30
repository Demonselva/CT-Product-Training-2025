using System;

namespace Bringova.Models
{
    public class Order
    {
        public int order_id { get; set; }
        public int user_id { get; set; }
        public int product_id { get; set; }
        public string? address { get; set; }
        public string? payment_method { get; set; }
        public string? payment_status { get; set; }
        public string? delivery_status { get; set; }
        public int? Total_Price { get; set; }
        public int? Quantity { get; set; }
        public string? message { get; set; }
        public DateTime? message_date { get; set; }
        public DateTime? order_date { get; set; }

        // For joined data
        public User? user { get; set; }
        public Product? product { get; set; }
    }
}
