namespace vetkonnect.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Category { get; set; } // E.g., medication, feed, equipment
        public string? ImageUrl { get; set; } // URL to product image
        public string? OwnerId { get; set; } // Foreign key to ApplicationUser

        public ApplicationUser? Owner { get; set; } // Navigation property for Owner
    }
}
