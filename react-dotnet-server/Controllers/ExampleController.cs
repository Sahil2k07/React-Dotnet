using Microsoft.AspNetCore.Mvc;
using react_dotnet_core.Interfaces;

[ApiController]
[Route("/api/example")]
public class ExampleController(IExampleService exampleService) : Controller
{
    private readonly IExampleService _exampleService = exampleService;

    [HttpGet]
    public async Task<string> GetRandomString()
    {
        return await _exampleService.GetRandomString();
    }
}
