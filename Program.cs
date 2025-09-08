using Microsoft.EntityFrameworkCore;
using TodoListApi.Data;
using TodoListApi.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection") ?? 
        "Host=localhost;Database=todo;Username=todo;Password=todo123"));

// Add GraphQL services
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<TaskType>()
    .AddType<CreateTaskInputType>()
    .AddType<UpdateTaskStatusInputType>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowAll");

app.UseRouting();

app.MapGraphQL();

app.Run();
