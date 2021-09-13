using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MessageAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("641b6bb2-71cf-4c80-83e3-224f08cefe7e"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("7ec9a2e4-d127-4c72-bc7f-7e7303380d5e"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("8a3acf04-d069-4372-8062-09cbf39134a0"));

            migrationBuilder.AddColumn<int>(
                name: "ChannelType",
                table: "Channels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    SenderId = table.Column<string>(nullable: true),
                    ChannelId = table.Column<Guid>(nullable: false),
                    MessageType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Channels_ChannelId",
                        column: x => x.ChannelId,
                        principalTable: "Channels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("f1ce14c5-1541-4278-81cc-23b0ce207405"), 0, "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("73ba5e25-27fc-4d20-a771-925450b665ea"), 0, "Canal dedicado a AngularJS", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "ChannelType", "Description", "Name" },
                values: new object[] { new Guid("cfa90874-092c-4b4f-bcd7-4d72ba0a1fb7"), 0, "Canal dedicado a React JS", "React JS" });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChannelId",
                table: "Messages",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("73ba5e25-27fc-4d20-a771-925450b665ea"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("cfa90874-092c-4b4f-bcd7-4d72ba0a1fb7"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("f1ce14c5-1541-4278-81cc-23b0ce207405"));

            migrationBuilder.DropColumn(
                name: "ChannelType",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("641b6bb2-71cf-4c80-83e3-224f08cefe7e"), "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("7ec9a2e4-d127-4c72-bc7f-7e7303380d5e"), "Canal dedicado a AngularJS", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("8a3acf04-d069-4372-8062-09cbf39134a0"), "Canal dedicado a React JS", "React JS" });
        }
    }
}
