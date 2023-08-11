using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using ToDoApp.Models;

namespace ToDoApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;

        public UserController(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<Users>> GetUser(string email)
        {
            if (_toDoContext.User == null)
            {
                return NotFound();
            }
            var users = await _toDoContext.User.FindAsync(email);

            if (users == null)
            {
                return NotFound();
            }

            return users;

        }


        [HttpPost]
        [Route("/signup")]
        public async Task<ActionResult<ToDo>> signup(Users user)
        {
            _toDoContext.User.Add(user);
            await _toDoContext.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { email = user.email }, user);

        }

        /*[HttpGet]
        [Route("/login")]
        public JsonResult login(Users user)
        {
            string query = @"select * from todos where user_email = " + email + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ToDoAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, myCon))
                {
                    myReader = sqlCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }*/
    }
}
