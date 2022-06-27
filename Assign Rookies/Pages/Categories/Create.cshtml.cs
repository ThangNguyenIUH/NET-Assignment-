using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Categories
{
    [BindProperties]
    public class CreateModel : PageModel
    {

        private readonly ApplicationDbContext _dbContext;
        public CreateModel(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Category Category { get; set; }

        public void OnGet()
        {
            

        }

        public IActionResult OnPost()
        {
             _dbContext.Add(Category);
             _dbContext.SaveChanges();
            return RedirectToPage("Index");
        }
    }
}
