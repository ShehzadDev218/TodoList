# Use the official .NET 9.0 runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the official .NET 9.0 SDK as the build image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["TodoListApi/TodoListApi.csproj", "TodoListApi/"]
RUN dotnet restore "TodoListApi/TodoListApi.csproj"
COPY . .
WORKDIR "/src/TodoListApi"
RUN dotnet build "TodoListApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoListApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListApi.dll"]
