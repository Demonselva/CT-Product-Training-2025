using Bringova.Models;
using Bringova.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Bringova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Bringova")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

    
        [HttpPost("add")]
        public IActionResult AddOrder([FromBody] Order order)
        {
            bool success = _orderService.AddOrder(order);
            if (success)
                return Ok(new { message = "Order placed successfully" });

            return BadRequest(new { message = "Failed to place order" });
        }

        [HttpPut("update")]
        public IActionResult UpdateOrder([FromBody] Order order)
        {
            bool success = _orderService.UpdateOrder(order);
            if (success)
                return Ok(new { message = "Order updated successfully" });

            return BadRequest(new { message = "Failed to update order" });
        }


        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _orderService.GetAllOrders();
            return Ok(orders);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetOrdersByUser(int userId)
        {
            var orders = _orderService.GetOrdersByUserId(userId);
            if (orders.Count == 0)
                return NotFound(new { message = "No orders found for this user" });

            return Ok(orders);
        }

       
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            bool success = _orderService.DeleteOrder(id);
            if (success)
                return Ok(new { message = "Order deleted successfully" });

            return NotFound(new { message = "Order not found" });
        }

        [HttpGet("hasOrders/{userId}")]
        public IActionResult HasOrders(int userId)
        {
            bool hasOrders = _orderService.HasOrders(userId);

            if (hasOrders)
                return Ok(new { message = "User has existing orders", hasOrders = true });

            return Ok(new { message = "User has no orders", hasOrders = false });
        }

    }
}
