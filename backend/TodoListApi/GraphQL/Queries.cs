using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Data;
using TodoListApi.Models;

namespace TodoListApi.GraphQL
{
    public class Query
    {
        public async Task<List<Models.Task>> GetAllTasks([Service] TodoDbContext context)
        {
            return await context.Tasks.ToListAsync();
        }
        
        public async Task<Models.Task?> GetTaskById(int id, [Service] TodoDbContext context)
        {
            return await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
