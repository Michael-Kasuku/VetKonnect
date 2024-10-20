using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class role_data : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert initial roles
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Veterinarian" },
                    { 3, "Farmer" },
                    { 4, "Customer" }
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the inserted roles
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValues: new object[] { 1, 2, 3, 4 }
            );
        }
    }
}
