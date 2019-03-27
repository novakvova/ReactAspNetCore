using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebSiteCore.BLL.Abstraction;
using WebSiteCore.BLL.Models;

namespace WebSiteCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MicroblogController : ControllerBase
    {
        private readonly IMicroblogService _microblogService;

        public MicroblogController(IMicroblogService microblogService)
        {
            _microblogService = microblogService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] MicroblogEditModel model)
        {
            var result = await _microblogService.CreatePost(model);

            if (result.IsSuccessful)
            {
                return new OkObjectResult(result.Data);
            }
            return BadRequest();
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search()
        {
            var result = await _microblogService.Search();

            if (result.IsSuccessful)
            {
                return new OkObjectResult(result.Data);
            }
            return BadRequest();
        }
    }
}