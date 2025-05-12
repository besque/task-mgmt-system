import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/actions';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
    
    // jQuery animation for dashboard elements
    $(document).ready(function() {
      $('.task-card').fadeIn(500);
      
      // Hover effect using jQuery
      $('.task-card').hover(
        function() { $(this).addClass('shadow-lg').css('cursor', 'pointer'); },
        function() { $(this).removeClass('shadow-lg'); }
      );
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // jQuery animation for delete
      $(`#task-${id}`).fadeOut(300, function() {
        dispatch(deleteTask(id));
      });
    }
  };

  return (
    <div className="dashboard">
      <h2 className="mb-4">Task Dashboard</h2>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Add a task to get started!</div>
      ) : (
        <div className="row">
          {tasks.map(task => (
            <div className="col-md-4 mb-4" key={task._id} id={`task-${task._id}`}>
              <div className="card task-card">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description?.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between">
                    <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                      {task.status}
                    </span>
                    <small className="text-muted">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <Link to={`/task/${task._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;