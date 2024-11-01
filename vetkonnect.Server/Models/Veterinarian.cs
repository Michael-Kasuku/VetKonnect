namespace vetkonnect.Server.Models
{
    public class Veterinarian
    {
        public int Id { get; set; }
        public string? UserId { get; set; } // Foreign key to ApplicationUser
        public string? KvbNumber { get; set; }
        public string? Specialty { get; set; } // Areas of expertise
        public string? Location { get; set; }
        public string? ContactInformation { get; set; }

        public ApplicationUser? User { get; set; } // Navigation property
    }
}
