using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment; 
        private readonly ContactsAPIDbContext _contactAPIDbContext;

        public CategoryController(ContactsAPIDbContext contactAPIDbContext, IWebHostEnvironment webHostEnvironment)
        {
            _contactAPIDbContext = contactAPIDbContext;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategories()
        {
            return await _contactAPIDbContext.CategoryModels
                .Select(c => new CategoryModel()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Type = c.Type,
                })
                .ToListAsync();
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Category>> GetByID(int id)
        //{
        //    var categoryFromDb = _contactAPIDbContext.Categories.Find(id);
        //    if (categoryFromDb == null)
        //        return BadRequest("Category not found.");
        //    return Ok(categoryFromDb);
        //}

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCategory([FromRoute] int id)
        {
            var category = await _contactAPIDbContext.CategoryModels.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        //[HttpPost]
        //public async Task<ActionResult<CategoryModel>> PostCategoryModel([FromForm] CategoryModel categoryModel)
        //{
        //    _contactAPIDbContext.CategoryModels.Add(categoryModel);
        //    await _contactAPIDbContext.SaveChangesAsync();
        //    return StatusCode(201);
        //}

        [HttpPost]
        public async Task<IActionResult> AddCategory(CategoryModel addCategory)
        {
            var category = new CategoryModel()
            {

                Name = addCategory.Name,
                Type = addCategory.Type,

            };

            await _contactAPIDbContext.CategoryModels.AddAsync(category);
            await _contactAPIDbContext.SaveChangesAsync();

            return Ok(category);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> PutCategoryModel(int id, [FromForm] CategoryModel categoryModel)
        {
            var category = await _contactAPIDbContext.CategoryModels.FindAsync(id);
            if (category != null)
            {
                category.Type = categoryModel.Type;
                category.Name = categoryModel.Name;


                await _contactAPIDbContext.SaveChangesAsync();

                return Ok(category);
            }
            return NotFound();
        }

        //[HttpDelete("{id}")]
        //public async Task<ActionResult<List<Category>>> Delete(int id)
        //{
        //    var categoryFromDb = await _contactAPIDbContext.Categories.FindAsync(id);
        //    if (categoryFromDb == null)
        //        return BadRequest("Category not found.");
        //    _contactAPIDbContext.Categories.Remove(categoryFromDb);
        //    await _contactAPIDbContext.SaveChangesAsync();
        //    return Ok(await _contactAPIDbContext.Categories.ToListAsync());
        //    {

        //    }
        //}
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            var category = await _contactAPIDbContext.CategoryModels.FindAsync(id);

            if (category != null)
            {
                _contactAPIDbContext.Remove(category);
                await _contactAPIDbContext.SaveChangesAsync();
                return Ok(_contactAPIDbContext.CategoryModels.ToListAsync());
            }
            return NotFound();
        }
    }
}
