namespace vetkonnect.Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int CommunityPostId { get; set; } // Foreign key to CommunityPost
        public string? UserId { get; set; } // Foreign key to ApplicationUser
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public CommunityPost? CommunityPost { get; set; } // Navigation property
        public ApplicationUser? User { get; set; } // Navigation property
    }
}
