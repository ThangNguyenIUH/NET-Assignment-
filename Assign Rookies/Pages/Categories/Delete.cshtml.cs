using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Categories
{
    [BindProperties]
    public class DeleteModel : PageModel
    {
        private readonly ApplicationDbContext _db;

        public DeleteModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public Category Categories { get; set; }
        public void OnGet(int id)
        {
            Categories = _db.Categories.FirstOrDefault(x => x.Id == id);
        }

        public IActionResult OnPost()
        {
            _db.Remove(Categories);
            _db.SaveChanges();
            return RedirectToPage("Index");
        }

    }
}