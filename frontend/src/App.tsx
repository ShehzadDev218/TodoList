import React, { useState, useEffect } from 'react';
import { 
  View, 
  Heading, 
  Content, 
  Flex, 
  TextField, 
  Button, 
  TextArea, 
  ActionButton,
  Divider,
  Well,
  ProgressCircle,
  Text
} from '@adobe/react-spectrum';
import { Add, Checkmark, Delete } from '@adobe/react-spectrum-icons';
import { Task, TaskStatus } from './types/Task';
import { GraphQLClient } from './services/GraphQLClient';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const graphqlClient = new GraphQLClient('http://localhost:5000/graphql');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await graphqlClient.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      setSubmitting(true);
      const newTask = await graphqlClient.createTask({
        title: newTaskTitle,
        description: newTaskDescription
      });
      
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTaskStatus = async (taskId: number, currentStatus: TaskStatus) => {
    try {
      const newStatus = currentStatus === TaskStatus.Pending 
        ? TaskStatus.Completed 
        : TaskStatus.Pending;
      
      const updatedTask = await graphqlClient.updateTaskStatus(taskId, newStatus);
      
      if (updatedTask) {
        setTasks(prev => 
          prev.map(task => 
            task.id === taskId ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const success = await graphqlClient.deleteTask(taskId);
      
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return (
      <View padding="size-400">
        <Flex justifyContent="center" alignItems="center" height="size-2000">
          <ProgressCircle aria-label="Loading tasks" />
        </Flex>
      </View>
    );
  }

  return (
    <View padding="size-400">
      <Heading level={1} marginBottom="size-400">
        Todo List
      </Heading>
      
      <Well marginBottom="size-400">
        <Heading level={3} marginBottom="size-200">
          Add New Task
        </Heading>
        <Flex direction="column" gap="size-200">
          <TextField
            label="Task Title"
            value={newTaskTitle}
            onChange={setNewTaskTitle}
            placeholder="Enter task title..."
            isRequired
          />
          <TextArea
            label="Description"
            value={newTaskDescription}
            onChange={setNewTaskDescription}
            placeholder="Enter task description (optional)..."
          />
          <Button
            variant="primary"
            onPress={handleCreateTask}
            isDisabled={!newTaskTitle.trim() || submitting}
          >
            <Add />
            <span>Add Task</span>
          </Button>
        </Flex>
      </Well>

      <Divider marginY="size-400" />

      <Heading level={2} marginBottom="size-300">
        Tasks ({tasks.length})
      </Heading>

      {tasks.length === 0 ? (
        <Well>
          <Text>No tasks yet. Create your first task above!</Text>
        </Well>
      ) : (
        <Flex direction="column" gap="size-200">
          {tasks.map((task) => (
            <Well key={task.id}>
              <Flex direction="column" gap="size-100">
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading level={4} margin={0}>
                    {task.title}
                  </Heading>
                  <Flex gap="size-100">
                    <ActionButton
                      onPress={() => handleToggleTaskStatus(task.id, task.status)}
                      aria-label={task.status === TaskStatus.Pending ? 'Mark as completed' : 'Mark as pending'}
                    >
                      <Checkmark />
                    </ActionButton>
                    <ActionButton
                      onPress={() => handleDeleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      <Delete />
                    </ActionButton>
                  </Flex>
                </Flex>
                
                {task.description && (
                  <Text>{task.description}</Text>
                )}
                
                <Flex justifyContent="space-between" alignItems="center">
                  <Text size="S" color="text-700">
                    Status: {task.status}
                  </Text>
                  <Text size="S" color="text-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </Text>
                </Flex>
              </Flex>
            </Well>
          ))}
        </Flex>
      )}
    </View>
  );
};

export default App;
