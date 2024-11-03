using System.ComponentModel.DataAnnotations;

namespace vetkonnect.Server.Shared.Models
{
    public class VetSignUpModel
    {
        [Required(ErrorMessage = "Username is required.")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string? EmailAddress { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "KVB Number is required.")]
        public string? KvbNumber { get; set; }

        [Required(ErrorMessage = "National Id Number is required.")]
        public string? NationalIdNo { get; set; }

        [Required(ErrorMessage = "Phone Number is required.")]
        public string? PhoneNumber { get; set; }

    }
}
