namespace vetkonnect.Server.Models
{
    public class Webinar
    {
        public int WebinarId { get; set; }
        public int PostedBy { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }

        // Navigation property for PostedByUser
        public virtual User? PostedByUser { get; set; }

        // Additional properties can be added here
    }
}
