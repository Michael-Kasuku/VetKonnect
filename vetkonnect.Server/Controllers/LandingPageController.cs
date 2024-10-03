using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace vetkonnect.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Adjusted route to avoid conflicts with the frontend
    public class LandingPageController : ControllerBase
    {
        private readonly ILogger<LandingPageController> _logger;
        private readonly IWebHostEnvironment _env;

        public LandingPageController(ILogger<LandingPageController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet("{*page}")] // This catches all routes
        public IActionResult Get(string? page)
        {
            // Serve the index.html for any request
            var filePath = Path.Combine(_env.WebRootPath, "index.html");
            if (System.IO.File.Exists(filePath))
            {
                return PhysicalFile(filePath, "text/html");
            }
            else
            {
                return NotFound();
            }
        }
    }
}
