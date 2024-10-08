namespace vetkonnect.Server.Models
{
    public class PhoneNumber
    {
        public int PhoneNumberId { get; set; }
        public int OwnedBy { get; set; }
        public string? Phone { get; set; }
        public bool PhoneNumberVerified { get; set; } = false;

        // Navigation property for the related User
        public virtual User? User { get; set; }
    }
}
