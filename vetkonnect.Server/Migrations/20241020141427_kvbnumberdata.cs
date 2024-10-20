using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class kvbnumberdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert sample data into KvbNumber table
            migrationBuilder.InsertData(
                table: "KvbNumbers",
                columns: new[] { "KvbNumberId", "KvbMemberId", "DateOfIssue", "DateOfExpiry", "KVBNumber" },
                values: new object[,]
                {
                    { 1, 1, "2024-01-01", "2026-01-01", "KVB12345" },
                    { 2, 2, "2023-12-01", "2025-12-01", "KVB23456" },
                    { 3, 3, "2022-11-15", "2024-11-15", "KVB34567" }
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the inserted data during rollback
            migrationBuilder.DeleteData(
                table: "KvbNumbers",
                keyColumn: "KvbNumberId",
                keyValues: new object[] { 1, 2, 3 }
            );
        }
    }
}
