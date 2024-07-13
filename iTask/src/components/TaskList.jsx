import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchTasks,
  updateTaskBackend,
  deleteTaskBackend,
  updateTaskStatusBackend,
} from '../features/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [sortCriteria, setSortCriteria] = useState('dueDate');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTaskBackend(id));
    dispatch(fetchTasks());
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatusBackend(id, status));
    dispatch(fetchTasks());
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    dispatch(fetchTasks());
  };

  const handleEditChange = (e) => {
    const {name, value} = e.target;
    setEditedTask((prev) => ({...prev, [name]: value}));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTaskBackend({...editedTask, id: editTaskId}));
    setEditTaskId(null);
    dispatch(fetchTasks());
  };

  const exportTasks = () => {
    if (tasks.length === 0) {
      alert('No tasks to export');
      return;
    }

    const headers = ['Title', 'Description', 'Due Date', 'Priority', 'Status'];
    const rows = tasks.map((task) => [
      task.title,
      task.description,
      new Date(task.dueDate).toLocaleDateString(),
      task.priority,
      task.status,
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortTasks = (tasks, criteria) => {
    return tasks.slice().sort((a, b) => {
      if (criteria === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (criteria === 'priority') {
        const priorities = {low: 3, medium: 2, high: 1};
        return priorities[a.priority] - priorities[b.priority];
      } else if (criteria === 'status') {
        const statuses = {'to-do': 1, 'in-progress': 2, completed: 3};
        return statuses[a.status] - statuses[b.status];
      }
      return 0;
    });
  };

  const sortedTasks = sortTasks(tasks, sortCriteria);

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <button
        onClick={exportTasks}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
      >
        Export to CSV
      </button>
      <label className='block mb-2'>Sort by:</label>
      <select
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
        className='bg-white border border-gray-300 rounded py-2 px-4 mb-4'
      >
        <option value='dueDate'>Due Date</option>
        <option value='priority'>Priority</option>
        <option value='status'>Status</option>
      </select>
      <ul className='divide-y divide-gray-300'>
        {sortedTasks.map((task) => (
          <li
            key={task._id}
            className='py-4'
          >
            {editTaskId === task._id ? (
              <form
                onSubmit={handleEditSubmit}
                className='space-y-2'
              >
                <div className='flex items-center'>
                  <label className='w-24'>Title:</label>
                  <input
                    type='text'
                    name='title'
                    value={editedTask.title}
                    onChange={handleEditChange}
                    className='border border-gray-300 rounded py-1 px-2 w-full'
                    required
                  />
                </div>
                <div className='flex items-center'>
                  <label className='w-24'>Description:</label>
                  <input
                    type='text'
                    name='description'
                    value={editedTask.description}
                    onChange={handleEditChange}
                    className='border border-gray-300 rounded py-1 px-2 w-full'
                  />
                </div>
                <div className='flex items-center'>
                  <label className='w-24'>Due Date:</label>
                  <input
                    type='date'
                    name='dueDate'
                    value={editedTask.dueDate}
                    onChange={handleEditChange}
                    className='border border-gray-300 rounded py-1 px-2'
                    required
                  />
                </div>
                <div className='flex items-center'>
                  <label className='w-24'>Priority:</label>
                  <select
                    name='priority'
                    value={editedTask.priority}
                    onChange={handleEditChange}
                    className='border border-gray-300 rounded py-1 px-2'
                  >
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                  </select>
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={() => setEditTaskId(null)}
                    className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className='space-y-2'>
                <h3 className='text-xl font-semibold'>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
                <div className='flex items-center space-x-2'>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    className='border border-gray-300 rounded py-1 px-2'
                  >
                    <option value='to-do'>To-Do</option>
                    <option value='in-progress'>In-Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                  <button
                    onClick={() => handleEdit(task)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
                  >
                    Delete
                  </button>
                </div>
                {task.history.length > 0 && (
                  <div className='mt-2'>
                    <h4 className='font-semibold'>History</h4>
                    <ul className='list-disc list-inside'>
                      {task.history.map((entry, index) => (
                        <li key={index}>
                          {entry.change} -{' '}
                          {new Date(entry.date).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
