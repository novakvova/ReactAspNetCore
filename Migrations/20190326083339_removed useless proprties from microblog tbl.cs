using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebSiteCore.Migrations
{
    public partial class removeduselessproprtiesfrommicroblogtbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "tblMicroblogs");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "tblMicroblogs");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "tblMicroblogs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "tblMicroblogs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "tblMicroblogs",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "tblMicroblogs",
                nullable: true);
        }
    }
}
