using react_dotnet_core.Interfaces;

namespace react_dotnet_core.Services;

public class ExampleService : IExampleService
{
    private static readonly string[] Data =
    [
        "Alpha",
        "Bravo",
        "Charlie",
        "Delta",
        "Echo",
        "Foxtrot",
        "Golf",
    ];

    private static readonly Random _random = new();

    public Task<string> GetRandomString()
    {
        var randomIndex = _random.Next(Data.Length);
        var result = Data[randomIndex];
        return Task.FromResult(result);
    }
}
