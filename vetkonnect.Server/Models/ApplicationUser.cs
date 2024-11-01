using Microsoft.AspNetCore.Identity;

namespace vetkonnect.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserType { get; set; } // "Veterinarian", "Farmer", or "Admin"
        public string? ProfilePicture { get; set; } // URL to profile picture

        // Navigation properties for one-to-one relationships
        public Veterinarian? Veterinarian { get; set; }
        public Farmer? Farmer { get; set; }
    }
}
