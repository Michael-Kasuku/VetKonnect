namespace vetkonnect.Server.Models
{
    public class CommunityPost
    {
        public int Id { get; set; }
        public string? UserId { get; set; } // Foreign key to Farmer
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public ApplicationUser? User { get; set; } // Navigation property
    }
}
