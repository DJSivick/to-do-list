using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Models
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
            
        }

        public  DbSet<ToDo> ToDos { get; set; }

        public DbSet<Users> User { get; set; }   
    }
}
