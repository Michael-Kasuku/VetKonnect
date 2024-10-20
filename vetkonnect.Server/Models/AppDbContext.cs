using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace vetkonnect.Server.Models
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<EmailAddressOTP> EmailAddressOTPs { get; set; }
        public DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public DbSet<PhoneNumberOTP> PhoneNumberOTPs { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Webinar> Webinars { get; set; }
        public DbSet<EduContent> EduContents { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<DeliveryPoint> DeliveryPoints { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<KvbMember> KvbMembers { get; set; }
        public DbSet<KvbNumber> KvbNumbers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Role and User relationship
            modelBuilder.Entity<User>()
                .HasOne<Role>()
                .WithMany()
                .HasForeignKey(u => u.CurrentRole)
                .OnDelete(DeleteBehavior.Restrict); // Adjust as per your requirement

            // EmailAddressOTP and User relationship
            modelBuilder.Entity<EmailAddressOTP>()
                .HasOne<User>(e => e.User) // Specify navigation property
                .WithMany(u => u.EmailAddressOTPs) // Specify collection property in User
                .HasForeignKey(e => e.BelongingTo)
                .OnDelete(DeleteBehavior.Cascade);

            // PhoneNumber and User relationship
            modelBuilder.Entity<PhoneNumber>()
                .HasOne<User>(p => p.User) // Specify navigation property
                .WithMany(u => u.PhoneNumbers) // Specify collection property in User
                .HasForeignKey(p => p.OwnedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // PhoneNumberOTP and User relationship
            modelBuilder.Entity<PhoneNumberOTP>()
                .HasOne<User>(p => p.User) // Specify navigation property
                .WithMany(u => u.PhoneNumberOTPs) // Specify collection property in User
                .HasForeignKey(p => p.SentTo)
                .OnDelete(DeleteBehavior.Cascade);

            // Event table relationships
            modelBuilder.Entity<Event>()
                .HasOne<User>(e => e.HostUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(e => e.Host)
                .OnDelete(DeleteBehavior.Cascade);

            // Appointment table relationships
            modelBuilder.Entity<Appointment>()
                .HasOne<User>(a => a.HostUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(a => a.Host)
                .OnDelete(DeleteBehavior.Cascade);

            // Webinar and User relationship
            modelBuilder.Entity<Webinar>()
                .HasOne<User>(w => w.PostedByUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(w => w.PostedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // EduContent and User relationship
            modelBuilder.Entity<EduContent>()
                .HasOne<User>(ec => ec.PostedByUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(ec => ec.PostedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // Service and User relationship
            modelBuilder.Entity<Service>()
                .HasOne<User>(s => s.OfferedByUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(s => s.OfferedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // Subscription and Package relationship
            modelBuilder.Entity<Subscription>()
                .HasOne<Package>()
                .WithMany()
                .HasForeignKey(sub => sub.SubscribedTo)
                .OnDelete(DeleteBehavior.Restrict);

            // Subscription and User relationship
            modelBuilder.Entity<Subscription>()
                .HasOne<User>(sub => sub.SubscriberUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(sub => sub.Subscriber)
                .OnDelete(DeleteBehavior.Cascade);

            // Product and User relationship
            modelBuilder.Entity<Product>()
                .HasOne<User>(p => p.OwnerUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(p => p.Owner)
                .OnDelete(DeleteBehavior.Cascade);

            // Product and ProductCategory relationship
            modelBuilder.Entity<Product>()
                .HasOne<ProductCategory>()
                .WithMany()
                .HasForeignKey(p => p.BelongingTo)
                .OnDelete(DeleteBehavior.Restrict);

            // Order and User relationship
            modelBuilder.Entity<Order>()
                .HasOne<User>(o => o.PlacedByUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(o => o.PlacedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // Order and Product relationship
            modelBuilder.Entity<Order>()
                .HasOne<Product>()
                .WithMany()
                .HasForeignKey(o => o.ProductOrdered)
                .OnDelete(DeleteBehavior.Restrict);

            // Order and DeliveryPoint relationship
            modelBuilder.Entity<Order>()
                .HasOne<DeliveryPoint>()
                .WithMany()
                .HasForeignKey(o => o.DeliveredAt)
                .OnDelete(DeleteBehavior.Restrict);

            // DeliveryPoint and User relationship
            modelBuilder.Entity<DeliveryPoint>()
                .HasOne<User>(dp => dp.AddedByUser) // Specify navigation property
                .WithMany() // Adjust if you have a collection in User
                .HasForeignKey(dp => dp.AddedBy)
                .OnDelete(DeleteBehavior.Cascade);

            // KvbMember and KvbNumber relationship
            modelBuilder.Entity<KvbNumber>()
                .HasOne<KvbMember>()
                .WithMany()
                .HasForeignKey(u => u.KvbMemberId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust as per your requirement
            // Add additional constraints, default values, and indices as necessary
        }


    }
}
