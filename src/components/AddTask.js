import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  
  const { title, description, status } = formData;
  
  useEffect(() => {
    // jQuery animations for form elements
    $(document).ready(function() {
      $('.form-control').focus(function() {
        $(this).addClass('shadow-sm border-primary');
      }).blur(function() {
        $(this).removeClass('shadow-sm border-primary');
      });
      
      $('#addTaskForm').fadeIn(500);
    });
  }, []);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // jQuery validation visual feedback
    if (e.target.value.trim() === '') {
      $(e.target).addClass('is-invalid');
    } else {
      $(e.target).removeClass('is-invalid').addClass('is-valid');
    }
  };
  
  const onSubmit = e => {
    e.preventDefault();
    
    // Form validation
    if (title.trim() === '') {
      $('#titleHelp').text('Title is required').addClass('text-danger');
      return;
    }
    
    if (description.trim() === '') {
      $('#descriptionHelp').text('Description is required').addClass('text-danger');
      return;
    }
    
    // jQuery animation for submit
    $('#submitBtn').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Adding...');
    
    // Simulate slight delay for the animation to be visible
    setTimeout(() => {
      dispatch(addTask(formData));
      
      // Success message with jQuery
      $('#successAlert').fadeIn().delay(1500).fadeOut(400, function() {
        navigate('/');
      });
    }, 800);
  };
  
  return (
    <div className="add-task">
      <h2 className="mb-4">Add New Task</h2>
      
      <div id="successAlert" className="alert alert-success" style={{display: 'none'}}>
        Task added successfully!
      </div>
      
      <div className="card" id="addTaskForm" style={{display: 'none'}}>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                aria-describedby="titleHelp"
              />
              <div id="titleHelp" className="form-text">Enter a descriptive title for your task</div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                rows="4"
                aria-describedby="descriptionHelp"
              ></textarea>
              <div id="descriptionHelp" className="form-text">Provide details about the task</div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={status}
                onChange={onChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="button"
                className="btn btn-secondary me-md-2"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="submitBtn"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;