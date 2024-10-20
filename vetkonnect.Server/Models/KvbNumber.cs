namespace vetkonnect.Server.Models
{
    public class KvbNumber
    {
        public int KvbNumberId { get; set; }
        public int KvbMemberId { get; set; }
        public string? DateOfIssue { get; set; }
        public string? DateOfExpiry { get; set; }
        public string? KVBNumber { get; set; }
    }
}
