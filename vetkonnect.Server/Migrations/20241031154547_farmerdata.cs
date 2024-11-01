using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class farmerdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert sample data into Users table
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmailAddress", "Password", "CurrentRole", "KvbNumberApprovalStatus", "NationalIdNoApprovalStatus", "EmailAddressConfirmed", "AccountActivationStatus", "AvailabilityStatus" },
                values: new object[,]
                {
                    { 4, "josphineotieno1@gmail.com", "superfarmer1@1234",3,false,false ,false,true,true},
                    { 5, "michaelotienokasuku1@gmail.com", "superfarmer2@1234",3,false,false ,false,true,true },
                    { 6, "daisylopez1@gmail.com", "superfarmer3@1234",3,false,false ,false,true,true}
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the inserted data during rollback
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValues: new object[] { 4, 5, 6 }
            );
        }
    }
}
