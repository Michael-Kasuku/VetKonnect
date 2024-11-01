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
    options.Password.RequireDigit = true; // Require at least one digit
    options.Password.RequireLowercase = true; // Require at least one lowercase letter
    options.Password.RequireNonAlphanumeric = true; // Require at least one special character
    options.Password.RequireUppercase = true; // Require at least one uppercase letter
    options.Password.RequiredLength = 8; // Minimum password length
    options.Password.RequiredUniqueChars = 1; // Minimum number of unique characters
})
.AddEntityFrameworkStores<AppDbContext>() // Use AppDbContext for user data storage
.AddDefaultTokenProviders(); // Add token providers for password resets and email confirmations

// Configure JWT authentication
var jwtSection = builder.Configuration.GetSection("JwtSettings"); // Get JWT settings from configuration
builder.Services.Configure<JwtSettings>(jwtSection); // Bind settings to JwtSettings class
var jwtSettings = jwtSection.Get<JwtSettings>(); // Retrieve JWT settings
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // Set default authentication scheme
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // Set default challenge scheme
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, // Validate the issuer
        ValidateAudience = true, // Validate the audience
        ValidateLifetime = true, // Validate the token's lifetime
        ValidateIssuerSigningKey = true, // Validate the signing key
        ValidIssuer = jwtSettings.Issuer, // Set valid issuer
        ValidAudience = jwtSettings.Audience, // Set valid audience
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)) // Set signing key
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
builder.Services.AddEndpointsApiExplorer(); // Adds support for endpoint exploration
builder.Services.AddSwaggerGen(); // Registers Swagger generator

// Build the application
var app = builder.Build();

// Apply pending database migrations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    // Apply any pending migrations
    context.Database.Migrate();
}

// Optional: Enable Swagger UI in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger
    app.UseSwaggerUI(); // Enable Swagger UI
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
app.UseAuthentication(); // Ensure this comes before UseAuthorization
app.UseAuthorization(); // Enable authorization

// Map API controllers to routes
app.MapControllers();

// Fallback for Single Page Application (SPA) routes – serve index.html for unmatched routes
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
