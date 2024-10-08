namespace vetkonnect.Server.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? KvbNumber { get; set; }
        public bool KvbNumberApprovalStatus { get; set; } = false;
        public string? NationalIdNo { get; set; }
        public bool NationalIdNoApprovalStatus { get; set; } = false;
        public string? EmailAddress { get; set; }
        public bool EmailAddressConfirmed { get; set; } = false;
        public string? Password { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public bool AccountActivationStatus { get; set; } = false;
        public bool AvailabilityStatus { get; set; } = false;
        public string? BioData { get; set; }
        public string? JobTitle { get; set; }
        public int CurrentRole { get; set; }
	public string? YearOfBirth { get; set; }
	public string? Gender { get; set; }


        // Navigation properties
        public virtual ICollection<EmailAddressOTP> EmailAddressOTPs { get; set; } = new List<EmailAddressOTP>();
        public virtual ICollection<PhoneNumber> PhoneNumbers { get; set; } = new List<PhoneNumber>();
        public virtual ICollection<PhoneNumberOTP> PhoneNumberOTPs { get; set; } = new List<PhoneNumberOTP>();
        public virtual ICollection<Webinar> WebinarsPosted { get; set; } = new List<Webinar>();
        public virtual ICollection<Event> EventsHosted { get; set; } = new List<Event>();
        public virtual ICollection<EduContent> EduContentsPosted { get; set; } = new List<EduContent>();

        // Navigation property for Service
        public virtual ICollection<Service> ServicesOffered { get; set; } = new List<Service>();

        // Navigation property for Product
        public virtual ICollection<Product> ProductsOwned { get; set; } = new List<Product>();

        // Navigation property for Subscription
        public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

        // Navigation property for Order
        public virtual ICollection<Order> OrdersPlaced { get; set; } = new List<Order>();

        // Navigation property for DeliveryPoints
        public virtual ICollection<DeliveryPoint> DeliveryPointsAdded { get; set; } = new List<DeliveryPoint>(); // Added for DeliveryPoint
    }
}
