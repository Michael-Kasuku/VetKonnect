namespace vetkonnect.Server.Models
{
    public class KvbNumber
    {
        public int Id { get; set; }
        public int MemberId { get; set; } // Foreign key to KvbMember
        public string? KvbNo { get; set; }
        public DateTime DateofIssue { get; set; }
        public DateTime DateofExpiry { get; set; }
        public KvbMember? Member { get; set; } // Navigation property
    }
}
