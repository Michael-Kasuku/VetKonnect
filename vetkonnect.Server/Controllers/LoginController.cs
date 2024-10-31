using Microsoft.AspNetCore.Mvc;

namespace vetkonnect.Server.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
