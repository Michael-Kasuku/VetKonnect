using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <summary>
    /// Migration class to add KvbNumber records with expiration dates set one year after the issue date.
    /// </summary>
    public partial class kvbnumber : Migration
    {
        /// <summary>
        /// Applies the migration by inserting data for KvbNumbers with calculated expiration dates.
        /// </summary>
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Sample data
            migrationBuilder.InsertData(
                table: "KvbNumbers",
                columns: new[] { "Id", "MemberId", "KvbNo", "DateofIssue", "DateofExpiry" },
                values: new object[,]
                {
                    { 1, 1, "KVB001", DateTime.UtcNow, DateTime.UtcNow.AddYears(1) },
                    { 2, 2, "KVB002", DateTime.UtcNow, DateTime.UtcNow.AddYears(1) },
                    { 3, 3, "KVB003", DateTime.UtcNow, DateTime.UtcNow.AddYears(1) }
                }
            );
        }

        /// <summary>
        /// Reverts the migration by deleting the inserted data from KvbNumbers.
        /// </summary>
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "KvbNumbers",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3 }
            );
        }
    }
}