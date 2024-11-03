using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <summary>
    /// Migration class to insert initial data into the KvbMembers table.
    /// </summary>
    public partial class kvbmember : Migration
    {
        /// <summary>
        /// Applies the migration by inserting data for KvbMembers.
        /// </summary>
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "KvbMembers",
                columns: new[] { "Id", "JobTitle", "FirstName", "LastName", "NationalIdNo", "PhoneNumber", "EmailAddress" },
                values: new object[,]
                {
                    { 1, "Chief Veterinary Officer", "Josphine", "Otieno", "1234567890", "0712345678", "josphine.otieno@example.com" },
                    { 2, "Veterinary Pathologist", "Michael", "Kasuku", "0987654321", "0723456789", "michael.kasuku@example.com" },
                    { 3, "Veterinary Technician", "Daisy", "Lopez", "1122334455", "0734567890", "daisy.lopez@example.com" }
                }
            );
        }

        /// <summary>
        /// Reverts the migration by deleting the inserted data from KvbMembers.
        /// </summary>
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "KvbMembers",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3 }
            );
        }
    }
}