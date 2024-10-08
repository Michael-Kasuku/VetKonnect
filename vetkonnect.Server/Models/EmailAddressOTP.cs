namespace vetkonnect.Server.Models
{
    public class EmailAddressOTP
    {
        public int EmailAddressOtpId { get; set; }

        public int BelongingTo { get; set; }

        public string? SenderEmailAddress { get; set; }
        public string? ReceiverEmailAddress { get; set; }
        public string? OtpCode { get; set; }

        public DateTime TimeGenerated { get; set; } = DateTime.Now;
        public DateTime ExpiryTime { get; set; }

        // Navigation property
        public virtual User? User { get; set; } // Assuming User class is in the same namespace
    }
}
