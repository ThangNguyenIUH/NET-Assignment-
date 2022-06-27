using Assign.DataAcess.Data;
using Assign.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Assign_Rookies.Pages.Categories
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _dbContext;

        public IndexModel(ApplicationDbContext dbConext)
        {
            _dbContext = dbConext;
        }
        public IEnumerable<Category> Categories { get; set; } //Khai báo biến để lưu danh sách ĐỐI TƯỢNG CATEGORY lấy từ db thông qua IEnumable<>
        //public List<Category> Categories { get; set; }

        public void OnGet()
        {
            //Categories này là cái thắng ở trên
            Categories = _dbContext.Categories.ToList(); // lấy từ db
        }
    }
}
