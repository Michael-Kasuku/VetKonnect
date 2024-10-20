using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class kvbmemberdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert sample data into KvbMember table
            migrationBuilder.InsertData(
                table: "KvbMembers",
                columns: new[] { "KvbMemberId", "FirstName", "LastName", "NationalIdNo" },
                values: new object[,]
                {
                    { 1, "Michael", "Kasuku", "12345678" },
                    { 2, "Daisy", "Lopez", "23456789" },
                    { 3, "Josephine", "Otieno", "34567890" }
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the inserted data during rollback
            migrationBuilder.DeleteData(
                table: "KvbMembers",
                keyColumn: "KvbMemberId",
                keyValues: new object[] { 1, 2, 3 }
            );
        }
    }
}
