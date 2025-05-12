export const FETCH_TASKS = 'FETCH_TASKS';
export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// Action creators
export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    dispatch({ type: SET_TASKS, payload: data });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    dispatch({ type: ADD_TASK, payload: data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    dispatch({ type: UPDATE_TASK, payload: data });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};