using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("9fd2544f-e42b-487e-93d2-a7aa2a0093e8"), "Canal dedicado a dotnet core", "DotNetCore" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("38a3c2c7-8381-45c9-90f8-5dde2a4036a2"), "Canal dedicado a AngularJS", "Angular" });

            migrationBuilder.InsertData(
                table: "Channels",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { new Guid("16d21f9b-d7cb-44b3-b652-49cfa306d251"), "Canal dedicado a React JS", "React JS" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("16d21f9b-d7cb-44b3-b652-49cfa306d251"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("38a3c2c7-8381-45c9-90f8-5dde2a4036a2"));

            migrationBuilder.DeleteData(
                table: "Channels",
                keyColumn: "Id",
                keyValue: new Guid("9fd2544f-e42b-487e-93d2-a7aa2a0093e8"));
        }
    }
}
