namespace vetkonnect.Server.Models
{
    public class PhoneNumberOTP
    {
        public int PhoneNumberOtpId { get; set; }
        public int SentTo { get; set; }
        public string? SenderPhoneNumber { get; set; }
        public string? ReceiverPhoneNumber { get; set; }
        public string? OtpCode { get; set; }
        public DateTime TimeGenerated { get; set; } = DateTime.Now;
        public DateTime ExpiryTime { get; set; }

        // Navigation property for the related User
        public virtual User? User { get; set; }
    }
}
