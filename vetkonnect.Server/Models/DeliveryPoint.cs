namespace vetkonnect.Server.Models
{
    public class DeliveryPoint
    {
        public int DeliveryPointId { get; set; }
        public int AddedBy { get; set; } // Foreign key for User
        public string? Description { get; set; }
        public int DeliveryFee { get; set; }

        // Navigation property for User
        public virtual User? AddedByUser { get; set; } // Navigation property for the user who added the delivery point
    }
}
