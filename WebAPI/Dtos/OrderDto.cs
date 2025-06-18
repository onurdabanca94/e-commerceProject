using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entity;

namespace WebAPI.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? AddressLine { get; set; }
        public string? CustomerId { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public List<OrderItemDto> OrderItems { get; set; } = new();
        public decimal SubTotal { get; set; }
        public decimal DeliveryFree { get; set; }
    }
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public string ProductImage { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}