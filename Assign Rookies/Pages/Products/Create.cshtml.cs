using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Products
{
    [BindProperties]
    public class CreateModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        public CreateModel(ApplicationDbContext db)
        {
            _db= db;
        }

        public Product Product { get; set; } // đối tượng SinhVien =>  public SinhVien(class) SinhVien {get : set}

        public void OnGet()
        {


        }

        public IActionResult OnPost()
        {
            _db.Add(Product);
            _db.SaveChanges();
            return RedirectToPage("Index");
        }
    }
}