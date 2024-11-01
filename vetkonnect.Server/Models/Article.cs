namespace vetkonnect.Server.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime PublishedDate { get; set; }
        public string? AuthorId { get; set; } // Foreign key to ApplicationUser

        public ApplicationUser? Author { get; set; } // Navigation property
    }
}
