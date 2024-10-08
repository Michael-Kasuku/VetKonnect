using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VetLicenseNo",
                table: "Users",
                newName: "YearOfBirth");

            migrationBuilder.RenameColumn(
                name: "LicenseNoApprovalStatus",
                table: "Users",
                newName: "NationalIdNoApprovalStatus");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KvbNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "KvbNumberApprovalStatus",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "NationalIdNo",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "KvbNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "KvbNumberApprovalStatus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NationalIdNo",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "YearOfBirth",
                table: "Users",
                newName: "VetLicenseNo");

            migrationBuilder.RenameColumn(
                name: "NationalIdNoApprovalStatus",
                table: "Users",
                newName: "LicenseNoApprovalStatus");
        }
    }
}
