namespace vetkonnect.Server.Models
{
    public class EduContent
    {
        public int EduContentId { get; set; }
        public int PostedBy { get; set; }
        public byte[]? Content { get; set; }
        public string? Description { get; set; }

        // Navigation property for User
        public virtual User? PostedByUser { get; set; } // Navigation property to User
    }
}
