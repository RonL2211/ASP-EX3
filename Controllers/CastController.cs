using Matala2_ASP.BL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Matala2_ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CastController : ControllerBase
    {
        // GET: api/Cast
        [HttpGet]
        public ActionResult<List<Cast>> Get()
        {
            var casts = Cast.GetAllCasts();
            return Ok(casts);
        }

        // GET api/Cast/{id}
        [HttpGet("{id}")]
        public ActionResult<Cast> Get(string id)
        {
            var cast = Cast.GetAllCasts().Find(c => c.Id == id);
            if (cast == null) return NotFound("Cast not found.");
            return Ok(cast);
        }

        // POST api/Cast
        [HttpPost]
        public IActionResult Post([FromBody] Cast newCast)
        {
            var success = Cast.Insert(newCast);
            if (!success) return BadRequest("Failed to add the cast.");
            return Ok("Cast added successfully.");
        }

        // PUT api/Cast/{id}
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Cast updatedCast)
        {
            updatedCast.Id = id; // Ensure ID remains unchanged
            var success = Cast.Update(updatedCast);
            if (!success) return NotFound("Failed to update the cast.");
            return Ok("Cast updated successfully.");
        }

        // DELETE api/Cast/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var success = Cast.Delete(id);
            if (!success) return NotFound("Failed to delete the cast.");
            return Ok("Cast deleted successfully.");
        }
    }
}
