using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Entity;

namespace WebAPI.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> query)
        {
            return query.Select(i => new OrderDto
            {
                Id = i.Id,
                CustomerId = i.CustomerId,
                Firstname = i.Firstname,
                Lastname = i.Lastname,
                Phone = i.Phone,
                AddressLine = i.AddressLine,
                City = i.City,
                DeliveryFree = i.DeliveryFree,
                SubTotal = i.SubTotal,
                OrderDate = i.OrderDate,
                OrderStatus = i.OrderStatus,
                OrderItems = i.OrderItems.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    ProductId = oi.ProductId,
                    ProductName = oi.ProductName,
                    ProductImage = oi.ProductImage,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList()
            });
        }
    }
}