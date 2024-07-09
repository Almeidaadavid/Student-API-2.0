using Microsoft.AspNetCore.Identity;
using StudentAPI.Services.Interfaces;

namespace StudentAPI.Services {
    public class AuthenticateService : IAuthenticate {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateService(SignInManager<IdentityUser> SignInManager, UserManager<IdentityUser> UserManager) 
        {
            _signInManager = SignInManager;
            _userManager = UserManager;
        }
        public async Task<bool> Authenticate(string email, string password) {
            SignInResult Result = await _signInManager.PasswordSignInAsync(email, password, false, lockoutOnFailure: false);
            return Result.Succeeded;
        }

        public async Task Logout() {
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> RegisterUser(string email, string password) {
            IdentityUser appUser = new IdentityUser {
                UserName = email,
                Email = email
            }; 

            IdentityResult result = await _userManager.CreateAsync(appUser, password);

            if (result.Succeeded) {
                await _signInManager.SignInAsync(appUser, isPersistent: false);
            }
            return result.Succeeded;
        }
    }
}
