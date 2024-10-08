namespace vetkonnect.Server.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public int Host { get; set; }
        public string? Guest { get; set; }
        public DateTime EventDate { get; set; }

        // Navigation property for HostUser
        public virtual User? HostUser { get; set; }

        // Navigation property for GuestUser
        public virtual User? GuestUser { get; set; }

        // Additional properties can be added here
    }
}
