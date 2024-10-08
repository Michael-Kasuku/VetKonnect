namespace vetkonnect.Server.Models
{
    public class Subscription
    {
        public int SubscriptionId { get; set; }
        public int Subscriber { get; set; }
        public int SubscribedTo { get; set; }
        public string? Description { get; set; }
        public string? ReceiptNo { get; set; }
        public bool SubscriptionStatus { get; set; } = false;
        public DateTime SubscriptionDate { get; set; } = DateTime.Now;
        public DateTime? ExpiryDate { get; set; }

        // Navigation property for User
        public virtual User? SubscriberUser { get; set; } // Navigation property for Subscriber

        // Navigation property for Package
        public virtual Package? Package { get; set; } // Navigation property for Package
    }
}
