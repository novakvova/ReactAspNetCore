using Microsoft.EntityFrameworkCore.Migrations;

namespace WebSiteCore.Migrations
{
    public partial class Imagestouser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblUserImages",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Path = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUserImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblUserImages_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblUserImages");
        }
    }
}
