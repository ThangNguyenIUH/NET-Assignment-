using Microsoft.AspNetCore.Identity;
using WebAPI.Models.Identity;

namespace WebAPI.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Tran Vu",
                    Email = "tranvu@test.com",
                    UserName = "tranvu@test.com",
                    Address = new Address
                    {
                        FirstName = "Tran",
                        LastName = "Vu",
                        Street = "10 The street",
                        City = "Da Lat",
                        State = "Lam Dong",
                        ZipCode = "670000"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}