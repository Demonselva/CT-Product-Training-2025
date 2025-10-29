namespace Bringova.Models
{
    public class Product
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string? product_description { get; set; }
        public decimal? offer_price { get; set; }
        public decimal price { get; set; }
        public string stock { get; set; }
        public DateTime? product_added_date { get; set; }
        public DateTime? product_edited_date { get; set; }
    }
}
