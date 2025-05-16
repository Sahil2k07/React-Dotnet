# React-Dotnet

This project demonstrates a setup that enables deploying a .NET backend and a React frontend together seamlessly. The idea is to build and bundle the React frontend inside the .NET project so that both run from the same server, simplifying deployment and development.

## Features

- Full integration of React frontend and .NET backend.

- React app is built automatically during the .NET publish process.

- Static React build files are copied to the .NET `wwwroot` folder.

- Single server hosting both API endpoints and frontend assets.

- Supports API documentation with Swagger (Swashbuckle).

- Uses `bun` for managing the React frontend build (can be replaced with npm or yarn).

- Easy to run locally or deploy as a single unit.

## Project Structure

- `/react-dotnet-client` — React frontend project

- `/react-dotnet-core` — .NET core backend project (business logic)

- `/react-dotnet-server` — .NET server project (web API + serves React build)

## How It Works

- The `.csproj` file of the .NET server project includes targets that:

  - Run `bun install` and `bun run build` in the React client folder before publishing.

  - Copy the React build output (`dist` folder) to the .NET `wwwroot` folder after publish.

- When the server runs, it serves React static files from `wwwroot`.

- API requests are handled by .NET controllers.

- Swagger UI is available for API documentation.

- This was added to the `.csproj` file.

  ```xml
  <PropertyGroup>
  <PublishDir>$(SolutionDir)build\</PublishDir>

  </PropertyGroup>

  <Target Name="BuildReact" BeforeTargets="PrepareForPublish">
    <Exec WorkingDirectory="$(SolutionDir)react-dotnet-client" Command="bun install" />
    <Exec WorkingDirectory="$(SolutionDir)react-dotnet-client" Command="bun run build" />
  </Target>

  <Target Name="CopyReactBuild" AfterTargets="Publish">
    <RemoveDir Directories="$(PublishDir)wwwroot" />
    <MakeDir Directories="$(PublishDir)wwwroot" />
    <ItemGroup>
    <ReactBuildFiles Include="$(SolutionDir)react-dotnet-client/dist/**/*" />
    </ItemGroup>
    <Copy
    SourceFiles="@(ReactBuildFiles)"
    DestinationFiles="@(ReactBuildFiles->'$(PublishDir)wwwroot/%(RecursiveDir)%(Filename)%(Extension)')"
    SkipUnchangedFiles="true" />
  </Target>
  ```

## Running Locally

1. Clone the Repository

   ```bash
   git clone https://github.com/Sahil2k07/React-Dotnet.git
   ```

2. Navigate inside it

   ```bash
   cd React-dotnet
   ```

3. Make a build of the Project

   ```bash
   dotnet publish react-dotnet.sln -c Release
   ```

4. Start the build

   ```bash
   cd build
   dotnet react-dotnet-server.dll
   ```

5. The project will be served at `http://localhost:5000`

## Deployment

- Publish the .NET server project.
- The React app will be bundled inside the publish folder.
- Deploy the entire publish folder to your hosting environment.

## Notes

- You can replace `bun` with `npm` or `yarn` if preferred, by adjusting the build commands in the `.csproj` file.

- Using this setup avoids the need for separate servers or proxies during deployment.

- You can extend this by adding authentication, backend services, or advanced API routes.

---
