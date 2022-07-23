using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ContactsAPIDbContext _contactsAPIDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductController(ContactsAPIDbContext contactsAPIDbContext, IWebHostEnvironment webHostEnvironment)
        {
            _contactsAPIDbContext = contactsAPIDbContext;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetPruducts()
        {
            return await _contactsAPIDbContext.ProductModels
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    Price = x.Price,
                    Description = x.Description,
                    ImageName = x.ImageName,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetByID(int id)
        {
            var productFromDb = await _contactsAPIDbContext.ProductModels.FindAsync(id);
            productFromDb.ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, productFromDb.ImageName);
            if (productFromDb == null)
                return BadRequest("Product not found.");
            return Ok(productFromDb);
        }

        [HttpPost]
        public async Task<ActionResult<ProductModel>> PostProductModel([FromForm] ProductModel productModel)
        {
            productModel.ImageName = await SaveImage(productModel.ImageFile);
            _contactsAPIDbContext.ProductModels.Add(productModel);
            await _contactsAPIDbContext.SaveChangesAsync();
            return StatusCode(201);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductModel(int id, [FromForm] ProductModel productModel)
        {
            if (id != productModel.Id)
            {
                return BadRequest();
            }

            if (productModel.ImageFile != null)
            {
                DeleteImage(productModel.ImageName);
                productModel.ImageName = await SaveImage(productModel.ImageFile);
            }

            _contactsAPIDbContext.Entry(productModel).State = EntityState.Modified;

            try
            {
                await _contactsAPIDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }

            return NoContent();
        }
        private bool ProductModelExists(int id)
        {
            return _contactsAPIDbContext.ProductModels.Any(e => e.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Product>>> Delete(int id)
        {
            var productFromDb = await _contactsAPIDbContext.ProductModels.FindAsync(id);
            if (productFromDb == null)
                return BadRequest("Product not found.");
            _contactsAPIDbContext.ProductModels.Remove(productFromDb);
            await _contactsAPIDbContext.SaveChangesAsync();
            return Ok(await _contactsAPIDbContext.ProductModels.ToListAsync());

        }
    }
}
