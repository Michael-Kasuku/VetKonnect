using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vetkonnect.Server.Models;
using System.Threading.Tasks;

namespace vetkonnect.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] Message message)
        {
            if (message == null || string.IsNullOrWhiteSpace(message.Name) || string.IsNullOrWhiteSpace(message.SenderEmailAddress) || string.IsNullOrWhiteSpace(message.Subject) || string.IsNullOrWhiteSpace(message.MessageContent))
            {
                return BadRequest("Invalid message data.");
            }

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateMessage), new { id = message.MessageId }, message);
        }
    }
}
