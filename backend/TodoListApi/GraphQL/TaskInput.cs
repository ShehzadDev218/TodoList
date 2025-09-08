using HotChocolate;
using HotChocolate.Types;
using System.ComponentModel.DataAnnotations;

namespace TodoListApi.GraphQL
{
    public class CreateTaskInput
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
    }
    
    public class UpdateTaskStatusInput
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        public Models.TaskStatus Status { get; set; }
    }
    
    public class CreateTaskInputType : InputObjectType<CreateTaskInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<CreateTaskInput> descriptor)
        {
            descriptor.Field(t => t.Title).Type<NonNullType<StringType>>();
            descriptor.Field(t => t.Description).Type<StringType>();
        }
    }
    
    public class UpdateTaskStatusInputType : InputObjectType<UpdateTaskStatusInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<UpdateTaskStatusInput> descriptor)
        {
            descriptor.Field(t => t.Id).Type<NonNullType<IntType>>();
            descriptor.Field(t => t.Status).Type<NonNullType<EnumType<Models.TaskStatus>>>();
        }
    }
}
