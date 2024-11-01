namespace vetkonnect.Server.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string? SenderId { get; set; } // Foreign key to ApplicationUser as Sender
        public string? ReceiverId { get; set; } // Foreign key to ApplicationUser as Receiver
        public string? Message { get; set; }
        public DateTime NotificationDate { get; set; }
        public bool IsRead { get; set; }

        public ApplicationUser? Sender { get; set; } // Navigation property for Sender
        public ApplicationUser? Receiver { get; set; } // Navigation property for Receiver
    }
}
