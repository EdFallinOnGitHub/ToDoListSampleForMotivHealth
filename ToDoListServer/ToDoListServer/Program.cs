
using ToDoListServer;

var builder = WebApplication.CreateBuilder(args);

/* Adding services to the container. */

// Syntax that ensures isolated DbContexts / data classes for each request.
builder.Services.AddDbContext<ItemDataSource>();
builder.Services.AddScoped<ItemRepository>();

builder.Services.AddControllers();

string CORSPolicyName = "AllAndAnything";

/* Setting a CORS anti-policy. */
builder.Services.AddCors((options) => {
  options.AddPolicy(
    CORSPolicyName, 
    policy => {
      // Returned headers must specify origin, method, and header (for preflight requests)
      // that are allowed, though usually not any / all of them, as here (for demo only).
      policy.AllowAnyOrigin();
      policy.AllowAnyMethod();
      policy.AllowAnyHeader();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

/* Development-only Swaggery stuff. */
if (app.Environment.IsDevelopment()) {
  app.MapOpenApi();
}

app.UseCors(CORSPolicyName);

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
