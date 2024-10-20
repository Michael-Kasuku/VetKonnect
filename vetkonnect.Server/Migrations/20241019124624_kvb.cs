using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vetkonnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class kvb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KvbMembers",
                columns: table => new
                {
                    KvbMemberId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NationalIdNo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KvbMembers", x => x.KvbMemberId);
                });

            migrationBuilder.CreateTable(
                name: "KvbNumbers",
                columns: table => new
                {
                    KvbNumberId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KvbMemberId = table.Column<int>(type: "int", nullable: false),
                    DateOfIssue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfExpiry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KVBNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KvbNumbers", x => x.KvbNumberId);
                    table.ForeignKey(
                        name: "FK_KvbNumbers_KvbMembers_KvbMemberId",
                        column: x => x.KvbMemberId,
                        principalTable: "KvbMembers",
                        principalColumn: "KvbMemberId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KvbNumbers_KvbMemberId",
                table: "KvbNumbers",
                column: "KvbMemberId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KvbNumbers");

            migrationBuilder.DropTable(
                name: "KvbMembers");
        }
    }
}
