using Microsoft.AspNetCore.Mvc;

namespace vetkonnect.Server.Controllers
{
    public class VetDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
