namespace vetkonnect.Server.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int PlacedBy { get; set; } // Foreign key for User
        public int ProductOrdered { get; set; } // Foreign key for Product
        public float Payment { get; set; }
        public bool PaymentStatus { get; set; }
        public string? ReceiptNo { get; set; }
        public int DeliveredAt { get; set; } // Foreign key for DeliveryPoint
        public DateTime TimeOrdered { get; set; } = DateTime.Now;
        public DateTime? ExpectedDeliveryTime { get; set; }
        public DateTime? TimeDelivered { get; set; }
        public bool DeliveryStatus { get; set; }

        // Navigation property for User
        public virtual User? PlacedByUser { get; set; } // Navigation property for the user who placed the order

        // Navigation property for Product
        public virtual Product? Product { get; set; } // Navigation property for the product being ordered
    }
}
