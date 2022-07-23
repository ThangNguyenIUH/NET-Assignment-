namespace WebAPI.Models
{
    public class AddContactRequest
    {
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
