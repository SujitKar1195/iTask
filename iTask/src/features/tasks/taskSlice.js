import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

// Asynchronous action to fetch tasks from backend
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await fetch('/api/tasks'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    dispatch(setTasks(data)); // Dispatch setTasks action to update state
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Async action to update a task on the backend
export const updateTaskBackend = (updatedTask) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/update/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    const data = await response.json();
    dispatch(updateTask(data)); // Update task in state if successful
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Async action to delete a task on the backend
export const deleteTaskBackend = (taskId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/delete/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    dispatch(deleteTask(taskId)); // Delete task from state if successful
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Async action to update task status on the backend
export const updateTaskStatusBackend = (taskId, status) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/update/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status}),
    });
    if (!response.ok) {
      throw new Error('Failed to update task status');
    }
    const data = await response.json();
    dispatch(updateTaskStatus(data)); // Update task status in state if successful
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};

// Async action to add a task to the backend
export const addTaskBackend = (taskData) => async (dispatch) => {
  try {
    const response = await fetch('/api/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    const data = await response.json();
    dispatch(addTask(data)); // Update state with added task
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
      }
    },
  },
});

export const {setTasks, addTask, updateTask, deleteTask, updateTaskStatus} =
  taskSlice.actions;

export default taskSlice.reducer;
