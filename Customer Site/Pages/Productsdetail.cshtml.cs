using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using WebAPI.Models;

namespace Customer_Site.Pages
{
    public class ProductsModel : PageModel
    {
        private readonly HttpClient _http;
        public Product DBProduct = new Product();
        private int id;

        //public List<Category> CateroryID = new List<Category>();

        public async Task<IActionResult> OnGetAsync(int ProductID)
        {
            /*Console.WriteLine("1");*/
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:7054");

            this.id = ProductID;
            var res = await client.GetAsync("api/Product/" +ProductID);
            var result = res.Content.ReadAsStringAsync().Result;
            //DBProduct = JsonConvert.DeserializeObject<Product>(result);
            Console.WriteLine(result);
            DBProduct = JsonConvert.DeserializeObject<Product>(result);
            Console.WriteLine(DBProduct);
            return Page();

        }

    }
}