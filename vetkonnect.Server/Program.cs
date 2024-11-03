// Import necessary namespaces
using Microsoft.AspNetCore.Identity; // For Identity services
using Microsoft.EntityFrameworkCore; // For Entity Framework Core
using Microsoft.IdentityModel.Tokens; // For JWT token validation
using vetkonnect.Server.Models; // For application-specific models
using System.Text; // For encoding
using Microsoft.AspNetCore.Authentication.JwtBearer; // For JWT Bearer authentication

// Create a web application builder
var builder = WebApplication.CreateBuilder(args);

// Add services to the container

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Configure password requirements
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// Configure JWT authentication
var jwtSection = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSection);
var jwtSettings = jwtSection.Get<JwtSettings>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
    };
});

// Add support for API controllers
builder.Services.AddControllers();

// Configure CORS policy to allow all origins, methods, and headers
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Optional: Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Build the application
var app = builder.Build();

// Apply pending database migrations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

// Optional: Enable Swagger UI in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve default files (like index.html) in wwwroot
app.UseDefaultFiles();

// Serve static files (e.g., CSS, JS, images) from the wwwroot folder
app.UseStaticFiles();

// Force HTTPS redirection for secure connections
app.UseHttpsRedirection();

// Enable routing for the application
app.UseRouting();

// Use CORS policy defined earlier
app.UseCors("AllowAll");

// Enable authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Map API controllers to routes
app.MapControllers();

// Fallback for Single Page Application (SPA) routes – serve index.html for unmatched routes
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
