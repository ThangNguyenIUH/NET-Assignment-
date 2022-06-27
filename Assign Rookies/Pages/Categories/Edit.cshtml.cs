using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Categories
{
    [BindProperties]
    public class EditModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        public EditModel(ApplicationDbContext db)
        {
            _db = db;
        }

        public Category Category { get; set; } // đối tượng SinhVien =>  public SinhVien(class) SinhVien {get : set}

        public void OnGet(int id)
        {
            Category = _db.Categories.FirstOrDefault(x => x.Id == id);
        }

        public IActionResult OnPost()
        {
            _db.Update(Category);
            _db.SaveChanges();
            return RedirectToPage("Index");
        }
    }
}