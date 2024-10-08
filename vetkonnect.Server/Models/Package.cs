namespace vetkonnect.Server.Models
{
    public class Package
    {
        public int PackageId { get; set; }
        public string? Category { get; set; }
        public int Cost { get; set; }
        public int Duration { get; set; }
    }
}
