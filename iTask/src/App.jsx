import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center'>
      <header className='bg-blue-600 w-full py-6 mb-8'>
        <h1 className='text-4xl text-center text-white font-bold'>iTask</h1>
      </header>
      <main className='w-full max-w-4xl mx-auto px-4'>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
