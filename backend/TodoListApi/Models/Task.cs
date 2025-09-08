using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
    
    public enum TaskStatus
    {
        Pending,
        Completed
    }
}
