// Importing the necessary namespace for Entity Framework Core
using Microsoft.EntityFrameworkCore;

namespace vetkonnect.Server.Models
{
    // Defines the application database context inheriting from DbContext
    public class AppDbContext : DbContext
    {
        // Constructor that takes DbContextOptions and passes it to the base DbContext class
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Defining DbSet properties representing tables in the database for each model/entity
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Veterinarian> Veterinarians { get; set; }
        public DbSet<Farmer> Farmers { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<TreatmentRecord> TreatmentRecords { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CommunityPost> CommunityPosts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<KvbMember> KvbMembers { get; set; }
        public DbSet<KvbNumber> KvbNumbers { get; set; }

        // Overriding the OnModelCreating method to configure entity relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configures a one-to-one relationship between Veterinarian and ApplicationUser
            modelBuilder.Entity<Veterinarian>()
                .HasOne(vet => vet.User)                           // Each Veterinarian has one associated ApplicationUser
                .WithOne()                                         // No collection of Veterinarians in ApplicationUser
                .HasForeignKey<Veterinarian>(vet => vet.UserId)    // UserId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of User if Veterinarian exists

            // Configures a one-to-one relationship between Farmer and ApplicationUser
            modelBuilder.Entity<Farmer>()
                .HasOne(farmer => farmer.User)                     // Each Farmer has one associated ApplicationUser
                .WithOne()                                         // No collection of Farmers in ApplicationUser
                .HasForeignKey<Farmer>(farmer => farmer.UserId)    // UserId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of User if Farmer exists

            // Configures Appointment relationship with Veterinarian
            modelBuilder.Entity<Appointment>()
                .HasOne(appointment => appointment.Veterinarian)   // Each Appointment is associated with one Veterinarian
                .WithMany()                                        // Veterinarian does not have a collection of Appointments
                .HasForeignKey(appointment => appointment.VeterinarianId) // VeterinarianId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Veterinarian if Appointment exists

            // Configures Appointment relationship with Farmer
            modelBuilder.Entity<Appointment>()
                .HasOne(appointment => appointment.Farmer)         // Each Appointment is associated with one Farmer
                .WithMany()                                        // Farmer does not have a collection of Appointments
                .HasForeignKey(appointment => appointment.FarmerId) // FarmerId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Farmer if Appointment exists

            // Configures Article relationship with ApplicationUser for Author
            modelBuilder.Entity<Article>()
                .HasOne(article => article.Author)                 // Each Article has one associated Author
                .WithMany()                                        // Author does not have a collection of Articles
                .HasForeignKey(article => article.AuthorId)        // AuthorId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Author if Article exists

            // Configures Comment relationship with CommunityPost
            modelBuilder.Entity<Comment>()
                .HasOne(comment => comment.CommunityPost)          // Each Comment is associated with one CommunityPost
                .WithMany()                                        // CommunityPost does not have a collection of Comments
                .HasForeignKey(comment => comment.CommunityPostId) // CommunityPostId as foreign key
                .OnDelete(DeleteBehavior.Cascade);                // Cascade delete to remove Comments if CommunityPost is deleted

            // Configures Comment relationship with ApplicationUser for User
            modelBuilder.Entity<Comment>()
                .HasOne(comment => comment.User)                   // Each Comment is associated with one User
                .WithMany()                                        // User does not have a collection of Comments
                .HasForeignKey(comment => comment.UserId)          // UserId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of User if Comment exists

            // Configures CommunityPost relationship with ApplicationUser for User
            modelBuilder.Entity<CommunityPost>()
                .HasOne(post => post.User)                         // Each CommunityPost is associated with one User
                .WithMany()                                        // User does not have a collection of CommunityPosts
                .HasForeignKey(post => post.UserId)                // UserId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of User if CommunityPost exists

            // Configures TreatmentRecord relationship with Veterinarian
            modelBuilder.Entity<TreatmentRecord>()
                .HasOne(record => record.Veterinarian)             // Each TreatmentRecord has an associated Veterinarian
                .WithMany()                                        // Veterinarian does not have a collection of TreatmentRecords
                .HasForeignKey(record => record.VeterinarianId)    // VeterinarianId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Veterinarian if TreatmentRecord exists

            // Configures TreatmentRecord relationship with Farmer
            modelBuilder.Entity<TreatmentRecord>()
                .HasOne(record => record.Farmer)                   // Each TreatmentRecord is associated with one Farmer
                .WithMany()                                        // Farmer does not have a collection of TreatmentRecords
                .HasForeignKey(record => record.FarmerId)          // FarmerId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Farmer if TreatmentRecord exists

            // Configures Product relationship with ApplicationUser for Owner
            modelBuilder.Entity<Product>()
                .HasOne(product => product.Owner)                  // Each Product has an associated Owner
                .WithMany()                                        // Owner does not have a collection of Products
                .HasForeignKey(product => product.OwnerId)         // OwnerId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Owner if Product exists

            // Configures Notification relationship with ApplicationUser for the Sender
            modelBuilder.Entity<Notification>()
                .HasOne(notification => notification.Sender)       // Each Notification has a Sender
                .WithMany()                                        // Sender does not have a collection of Notifications
                .HasForeignKey(notification => notification.SenderId) // SenderId is the foreign key in Notification
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Sender if Notification exists

            // Configures Notification relationship with ApplicationUser for the Receiver
            modelBuilder.Entity<Notification>()
                .HasOne(notification => notification.Receiver)     // Each Notification has a Receiver
                .WithMany()                                        // Receiver does not have a collection of Notifications
                .HasForeignKey(notification => notification.ReceiverId) // ReceiverId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of Receiver if Notification exists
            
            // Configures KvbNumber relationship with KvbMember
            modelBuilder.Entity<KvbNumber>()
                .HasOne(kvbno => kvbno.Member)     // Each KvbNumber has a KvbMember
                .WithMany()                                        // KvbMember does not have a collection of KvbNumber
                .HasForeignKey(kvbno => kvbno.MemberId) // MemberId as foreign key
                .OnDelete(DeleteBehavior.Restrict);               // Restrict deletion of KvbMember if KvbNumber exists
        }
    }
}
