using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using vetkonnect.Server.Models;
using vetkonnect.Server.Shared.Models;

namespace vetkonnect.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VetController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AppDbContext _context;

        public VetController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AppDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        // POST: api/Vet/VetSignup
        [HttpPost("VetSignup")]
        public async Task<IActionResult> VetSignup([FromBody] VetSignUpModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Create the ApplicationUser instance
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.EmailAddress,
                UserType = "Veterinarian",
                EmailConfirmed = true,
                PhoneNumber = model.PhoneNumber,
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,              // Default to false; adjust as necessary
                LockoutEnabled = true,                 // Typically true; set according to your requirements
                AccessFailedCount = 0                  // Start with 0 failed access counts
            };

            // Create the user with the provided password
            var result = await _userManager.CreateAsync(user, model.Password);

            // Check if user creation was successful
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            try
            {
                // Create the Veterinarian instance
                var veterinarian = new Veterinarian
                {
                    UserId = user.Id,         // Foreign key to ApplicationUser
                    KvbNumber = model.KvbNumber,
                    NationalIdNo = model.NationalIdNo
                };

                // Add the Veterinarian to the database
                _context.Veterinarians.Add(veterinarian);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return StatusCode(500, "An error occurred while saving the veterinarian data.");
            }

            return Ok("Veterinarian registered successfully.");
        }

        // POST: api/Vet/VetLogin
        [HttpPost("VetLogin")]
        public async Task<IActionResult> VetLogin([FromBody] VetLoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Call PasswordSignInAsync with rememberMe set to false
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, lockoutOnFailure: false);

            if (!result.Succeeded) return Unauthorized("Invalid login attempt.");

            return Ok("Login successful.");
        }
    }
}
