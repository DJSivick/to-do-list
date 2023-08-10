using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using ToDoApp.Models;

namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;

        public ToDoController(ToDoContext toDoContext)
        {
            _toDoContext = toDoContext;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<List<ToDo>>> GetToDo(string email)
        {
            if(_toDoContext.ToDos == null)
            {
                return NotFound();
            }
            var todos = await _toDoContext.ToDos.Where(e => e.user_email == email).ToListAsync();

            if(todos == null) 
            {
                return NotFound();
            }

            return todos;
            
        }


        [HttpPost]
        public async Task<ActionResult<ToDo>> CreateToDo(ToDo todo)
        {
            _toDoContext.ToDos.Add(todo);
            await _toDoContext.SaveChangesAsync();

            return CreatedAtAction("GetToDo",new { email = todo.user_email} , todo);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ToDo>> UpdateToDo(string id , ToDo todo)
        {
            if(id != todo.id)
            {
                return BadRequest();
            }

            _toDoContext.Entry(todo).State = EntityState.Modified;
            try
            {
                await _toDoContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) 
            {
                throw;

            }

            return Ok();    
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDo>> DeleteToDo(string id)
        {
            if (_toDoContext.ToDos == null)
            {
                return NotFound();
            }

            var todo = await _toDoContext.ToDos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            _toDoContext.ToDos.Remove(todo);
            await _toDoContext.SaveChangesAsync();
            return Ok();

        }

    }
}
