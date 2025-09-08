using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Data;
using TodoListApi.Models;

namespace TodoListApi.GraphQL
{
    public class Mutation
    {
        public async Task<Models.Task> CreateTask(
            CreateTaskInput input,
            [Service] TodoDbContext context)
        {
            var task = new Models.Task
            {
                Title = input.Title,
                Description = input.Description,
                Status = Models.TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            
            context.Tasks.Add(task);
            await context.SaveChangesAsync();
            
            return task;
        }
        
        public async Task<Models.Task?> UpdateTaskStatus(
            UpdateTaskStatusInput input,
            [Service] TodoDbContext context)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == input.Id);
            
            if (task == null)
            {
                return null;
            }
            
            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;
            
            await context.SaveChangesAsync();
            
            return task;
        }
        
        public async Task<bool> DeleteTask(int id, [Service] TodoDbContext context)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            
            if (task == null)
            {
                return false;
            }
            
            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            
            return true;
        }
    }
}
