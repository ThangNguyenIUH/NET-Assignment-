using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Products
{
    [BindProperties]
    public class DeleteModel : PageModel
    {
        private readonly ApplicationDbContext _db;

        public DeleteModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public Product Product { get; set; }
        public void OnGet(int id)
        {
            Product = _db.Products.FirstOrDefault(x => x.Id == id);
        }

        public IActionResult OnPost()
        {
            _db.Remove(Product);
            _db.SaveChanges();
            return RedirectToPage("Index");
        }

    }
}
