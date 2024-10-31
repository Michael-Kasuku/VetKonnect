using Microsoft.AspNetCore.Mvc;

namespace vetkonnect.Server.Controllers
{
    public class ForgotPasswordController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
