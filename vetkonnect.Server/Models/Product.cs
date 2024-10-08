namespace vetkonnect.Server.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int BelongingTo { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public byte[]? ProductPhoto { get; set; }
        public int QuantityInStock { get; set; }
        public float Price { get; set; }
        public int Owner { get; set; }

        // Navigation property for User
        public virtual User? OwnerUser { get; set; } // Added for relationship with User
    }
}
