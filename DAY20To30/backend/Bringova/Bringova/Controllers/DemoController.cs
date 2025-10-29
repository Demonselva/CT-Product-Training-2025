using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Bringova.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Bringova")]
    public class DemoController : ControllerBase
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
