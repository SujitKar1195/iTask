import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTaskBackend} from '../features/tasks/taskSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add task to backend
    dispatch(
      addTaskBackend({title, description, dueDate, priority, status: 'to-do'})
    );
    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form
      onSubmit={onSubmit}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8'
    >
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Title
        </label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Description
        </label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Due Date
        </label>
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
      </div>
      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
