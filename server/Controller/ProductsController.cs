﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Dtos;
using server.Models;

namespace server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }
        //CRUD Operation

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateUpdateProductDto dto)
        {
            var newProduct = new Product()
            {
                Brand = dto.Brand,
                Title = dto.Title,
            };
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok("Product Saved");
        }

        //Read
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var producst = await _context.Products.OrderByDescending(q=>q.UpdatedAt).ToListAsync();

            return Ok(producst);
        }
        //Single Product
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Product>> GetProductById([FromRoute]long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p=> p.Id ==id);
            if (product is null)
            {
                return NotFound("Product Not Found...");
            } 
            return Ok(product);
        }

        //Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute]long id, [FromBody] CreateUpdateProductDto dto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null)
            {
                return NotFound("Product Not Found...");
            }
            product.Title = dto.Title;
            product.Brand = dto.Brand;
            product.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok("Product Updated...");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]

        public async Task<IActionResult> DeleteProduct([FromRoute]long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null)
            {
                return NotFound("Product Not Found...");
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok("Product deleted");
        }
    }
}
