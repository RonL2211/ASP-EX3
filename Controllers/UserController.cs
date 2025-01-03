﻿using Matala2_ASP.BL;
using Matala2_ASP.DAL;
using Microsoft.AspNetCore.Mvc;

namespace Matala2_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Register a new user
        [HttpPost("Register")]
        public IActionResult Register([FromBody] User newUser)
        {
            int result = newUser.Insert();
            if (result > 0)
                return Ok(new { message = "User registered successfully." });
            return BadRequest(new { message = "Failed to register user." });
        }

        // Login a user
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            UserDal userDal = new UserDal(); // Use the DAL instance
            var user = userDal.GetUserByEmailAndPassword(loginUser.Email, loginUser.Password); // Call the DAL method

            if (user == null)
                return Unauthorized("Invalid email or password.");
            return Ok(user);
        }

        // Get all users
        [HttpGet("All")]
        public IActionResult GetAllUsers()
        {
            UserDal userDal = new UserDal(); // Use the DAL instance
            var users = userDal.GetAllUsers(); // Call the DAL method

            if (users.Count == 0)
                return NotFound("No users found.");
            return Ok(users);
        }


        // Update user
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            updatedUser.Id = id;
            bool result = updatedUser.Update();
            if (result == true)
                return Ok("User updated successfully.");
            return BadRequest("Failed to update user.");
        }
    }
}
