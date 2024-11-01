namespace vetkonnect.Server.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int VeterinarianId { get; set; } // Foreign key to Veterinarian
        public int FarmerId { get; set; } // Foreign key to Farmer
        public DateTime AppointmentDate { get; set; }
        public string? Status { get; set; } // e.g., "Scheduled", "Completed", "Cancelled"
        public string? Notes { get; set; }

        public Veterinarian? Veterinarian { get; set; } // Navigation property
        public Farmer? Farmer { get; set; } // Navigation property
    }
}
