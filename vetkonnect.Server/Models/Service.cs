namespace vetkonnect.Server.Models
{
    public class Service
    {
        public int ServiceId { get; set; }
        public int OfferedBy { get; set; }
        public string? ServiceName { get; set; }

        // Navigation property for User
        public virtual User? OfferedByUser { get; set; } // Navigation property to User
    }
}
