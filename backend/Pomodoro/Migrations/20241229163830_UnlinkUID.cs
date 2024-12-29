using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pomodoro.Migrations
{
    /// <inheritdoc />
    public partial class UnlinkUID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DailyUsers_Users_UserId",
                table: "DailyUsers");

            migrationBuilder.DropIndex(
                name: "IX_DailyUsers_UserId",
                table: "DailyUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DailyUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "DailyUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DailyUsers_UserId",
                table: "DailyUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DailyUsers_Users_UserId",
                table: "DailyUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
