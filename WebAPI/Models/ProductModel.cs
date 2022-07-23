using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class ProductModel
    { 
            [Key]
            public int Id { get; set; }
            public string Name { get; set; }
            public double Price { get; set; }
            public string Description { get; set; }
            public string Type { get; set; }
            public string ImageName { get; set; }
            [NotMapped]
            public IFormFile ImageFile { get; set; }
            [NotMapped]
            public string ImageSrc { get; set; }


        
    }
}
