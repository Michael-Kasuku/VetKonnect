namespace vetkonnect.Server.Models
{
    public class Farmer
    {
        public int Id { get; set; }
        public string? UserId { get; set; } // Foreign key to ApplicationUser
        public string? FarmName { get; set; }
        public string? Location { get; set; }
        public string? ContactInformation { get; set; }

        public ApplicationUser? User { get; set; } // Navigation property
    }
}
