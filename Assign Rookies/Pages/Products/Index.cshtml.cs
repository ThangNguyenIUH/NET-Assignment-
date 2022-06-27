using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Products
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _dbContext;

        public IndexModel(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Product>  Products { get; set; }
        public void OnGet()
        {
            Products = _dbContext.Products.ToList();
        }
    }
}
