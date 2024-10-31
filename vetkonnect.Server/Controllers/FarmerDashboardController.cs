using Microsoft.AspNetCore.Mvc;

namespace vetkonnect.Server.Controllers
{
    public class FarmerDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
