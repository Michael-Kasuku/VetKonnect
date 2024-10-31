using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vetkonnect.Server.Models;
using System.Threading.Tasks;
using System.Linq;

namespace vetkonnect.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SignupController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/signup
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] User newUser)
        {
            if (newUser == null ||
                string.IsNullOrWhiteSpace(newUser.FirstName) ||
                string.IsNullOrWhiteSpace(newUser.LastName) ||
                string.IsNullOrWhiteSpace(newUser.EmailAddress) ||
                string.IsNullOrWhiteSpace(newUser.Password) ||
                string.IsNullOrWhiteSpace(newUser.Gender) ||
                newUser.YearOfBirth == null ||
                newUser.PhoneNumbers == null || !newUser.PhoneNumbers.Any())
            {
                return BadRequest("Invalid user data.");
            }

            // Fetch role_id based on the selected role
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleId == newUser.CurrentRole);

            if (role == null)
            {
                return BadRequest("Invalid role.");
            }

            newUser.CurrentRole = role.RoleId;  // Set the role_id in the user object

            // Conditional validation for Vet-specific fields using RoleId
            if (role.RoleName == "Vet" &&
                (string.IsNullOrWhiteSpace(newUser.KvbNumber) ||
                 string.IsNullOrWhiteSpace(newUser.NationalIdNo)))
            {
                return BadRequest("Vet role requires KVB Number and National ID.");
            }

            // Check if the email is already registered
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.EmailAddress == newUser.EmailAddress);
            if (existingUser != null)
            {
                return Conflict("Email is already registered.");
            }

            // Check if any phone number is already registered and prepare to add them
            foreach (var phoneNumber in newUser.PhoneNumbers)
            {
                var existingPhone = await _context.PhoneNumbers
                    .FirstOrDefaultAsync(p => p.Phone == phoneNumber.Phone);
                if (existingPhone != null)
                {
                    return Conflict($"Phone number {phoneNumber.Phone} is already registered.");
                }

                // Set the OwnedBy property to link the phone number to the user
                phoneNumber.OwnedBy = newUser.UserId; // Initially set to 0 or a temp value, will be updated after saving the user
                _context.PhoneNumbers.Add(phoneNumber); // Add the phone number to the context
            }

            // Add the new user to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync(); // Save both user and phone numbers

            return CreatedAtAction(nameof(RegisterUser), new { id = newUser.UserId }, newUser);
        }
    }
}
