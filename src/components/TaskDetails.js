import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../redux/actions';
import $ from 'jquery';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: ''
  });

  useEffect(() => {
    // Fetch tasks if not already in state
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    } else {
      const foundTask = tasks.find(t => t._id === id);
      if (foundTask) {
        setTask(foundTask);
        setFormData({
          title: foundTask.title,
          description: foundTask.description,
          status: foundTask.status
        });
      }
    }

    // jQuery animations
    $(document).ready(function() {
      $('.task-details-card').fadeIn(500);
      
      // Add smooth animations for edit mode toggle
      $('#editBtn').click(function() {
        $('.detail-view').slideUp(300, function() {
          $('.edit-view').slideDown(300);
        });
      });
      
      $('#cancelBtn').click(function() {
        $('.edit-view').slideUp(300, function() {
          $('.detail-view').slideDown(300);
        });
      });
    });
  }, [dispatch, id, tasks]);

  // Handle form input changes
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating task
  const onSubmit = e => {
    e.preventDefault();
    
    // jQuery animation for submit button
    $('#updateBtn').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...');
    
    setTimeout(() => {
      dispatch(updateTask(id, formData));
      
      // Show success message with jQuery
      $('#updateSuccess').fadeIn().delay(1500).fadeOut(400, function() {
        setIsEditing(false);
        $('.edit-view').hide();
        $('.detail-view').show();
      });
      
      $('#updateBtn').prop('disabled', false).text('Update Task');
    }, 800);
  };

  // Handle task deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      // jQuery animation for delete
      $('.task-details-card').fadeOut(500, function() {
        dispatch(deleteTask(id));
        navigate('/');
      });
    }
  };

  if (!task && tasks.length > 0) {
    return (
      <div className="alert alert-danger">Task not found</div>
    );
  }

  if (!task) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-details">
      <div id="updateSuccess" className="alert alert-success" style={{display: 'none'}}>
        Task updated successfully!
      </div>
      
      <div className="card task-details-card" style={{display: 'none'}}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>Task Details</h3>
          <div>
            <button 
              className="btn btn-outline-primary me-2" 
              id="editBtn"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button 
              className="btn btn-outline-danger" 
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {/* Detail View */}
          <div className="detail-view" style={{display: isEditing ? 'none' : 'block'}}>
            <h4 className="card-title">{task.title}</h4>
            <div className="mb-3">
              <span className={`badge ${task.status === 'completed' ? 'bg-success' : task.status === 'in-progress' ? 'bg-primary' : 'bg-warning'}`}>
                {task.status}
              </span>
              <small className="text-muted ms-2">
                Created on {new Date(task.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p className="card-text">{task.description}</p>
          </div>
          
          {/* Edit View */}
          <div className="edit-view" style={{display: isEditing ? 'block' : 'none'}}>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  id="cancelBtn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="updateBtn"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="card-footer">
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;