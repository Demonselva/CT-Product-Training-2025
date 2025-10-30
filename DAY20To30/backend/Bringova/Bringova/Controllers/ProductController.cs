using Bringova.Models;
using Bringova.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Bringova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Bringova")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            if (string.IsNullOrEmpty(product.product_name) || product.price <= 0)
                return BadRequest("Product name and price are required");

            bool success = _productService.AddProduct(product);
            if (success)
                return Ok(new { message = "Product added successfully" });

            return BadRequest(new { message = "Failed to add product" });
        }

    
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _productService.GetAllProducts();
            return Ok(products);
        }

        
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            return Ok(product);
        }

        
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            bool success = _productService.UpdateProduct(id, product);
            if (success)
                return Ok(new { message = "Product updated successfully" });

            return BadRequest(new { message = "Failed to update product" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            bool success = _productService.DeleteProduct(id);
            if (success)
                return Ok(new { message = "Product deleted successfully" });

            return NotFound(new { message = "Product not found" });
        }
    }
}
