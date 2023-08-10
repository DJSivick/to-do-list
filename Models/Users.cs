using System.ComponentModel.DataAnnotations;

namespace ToDoApp.Models
{
    public class Users
    {
        [Key]
        public string email { get; set; }

        public string password { get; set; }
    }
}
