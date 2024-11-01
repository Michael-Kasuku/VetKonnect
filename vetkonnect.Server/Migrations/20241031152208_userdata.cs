using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class userdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert sample data into Users table
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmailAddress", "Password", "NationalIdNo", "KvbNumber", "CurrentRole", "KvbNumberApprovalStatus", "NationalIdNoApprovalStatus", "EmailAddressConfirmed", "AccountActivationStatus", "AvailabilityStatus" },
                values: new object[,]
                {
                    { 1, "josphineotieno@gmail.com", "supervet1@1234", "12345678", "KVB12345",2,true,true ,true,true,true},
                    { 2, "michaelotienokasuku@gmail.com", "supervet2@1234", "23456789", "KVB23456",2,true,true,true,true,true },
                    { 3, "daisylopez@gmail.com", "supervet2@1234", "34567890", "KVB34567",2,true,true ,true,true,true}
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
                keyValues: new object[] { 1, 2, 3 }
            );
        }
    }
}
