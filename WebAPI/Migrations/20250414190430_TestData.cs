using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Telefon açıklaması", "1.jpg", true, "IPhone 16", 70000m, 100 },
                    { 2, "Telefon açıklaması", "2.jpg", true, "IPhone 16 Pro", 80000m, 200 },
                    { 3, "Telefon açıklaması", "3.jpg", true, "IPhone 16 Pro Max", 90000m, 300 },
                    { 4, "Telefon açıklaması", "4.jpg", true, "IPhone 16 Pro Max Oxi", 100000m, 400 },
                    { 5, "Telefon açıklaması", "5.jpg", true, "IPhone 16 Pro Max Oxi Action", 110000m, 500 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
