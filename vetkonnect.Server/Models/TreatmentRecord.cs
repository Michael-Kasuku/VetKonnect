namespace vetkonnect.Server.Models
{
    public class TreatmentRecord
    {
        public int Id { get; set; }
        public int VeterinarianId { get; set; } // Foreign key to Veterinarian
        public int FarmerId { get; set; } // Foreign key to Farmer
        public string? AnimalId { get; set; } // Identifier for the animal
        public DateTime TreatmentDate { get; set; }
        public string? TreatmentDescription { get; set; }
        public string? MedicationAdministered { get; set; }

        public Veterinarian? Veterinarian { get; set; } // Navigation property
        public Farmer? Farmer { get; set; } // Navigation property
    }
}
