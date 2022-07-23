using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using WebAPI.Models;

namespace Customer_Site.Pages
{
    public class IndexModel : PageModel
    {
        private readonly HttpClient _http;
        public List<Product> DBProduct = new List<Product>();


        //public List<Category> CateroryID = new List<Category>();

        public async Task<IActionResult> OnGetAsync()
        {
            /*Console.WriteLine("1");*/
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:7054/api/Product");

            var res = await client.GetAsync(client.BaseAddress);
            var result = res.Content.ReadAsStringAsync().Result;
            DBProduct = JsonConvert.DeserializeObject<List<Product>>(result);

            return Page();

        }
       
    }
}
