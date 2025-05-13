import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import AddServiceModal from './AddServiceModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Dashboard({ onLogout, user }) {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  }, []);

  const handleAddService = async (newService) => {
    const token = localStorage.getItem('token');
    try {
      const isUpdate = editingService !== null;
      const url = isUpdate 
        ? `${API_URL}/services/${editingService.id}`
        : `${API_URL}/services`;
      
      const response = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isUpdate ? 'update' : 'add'} service`);
      }

      const updatedService = await response.json();
      
      if (isUpdate) {
        setServices(prevServices => 
          prevServices.map(service => 
            service.id === updatedService.id ? updatedService : service
          )
        );
      } else {
        setServices(prevServices => [...prevServices, updatedService]);
      }
      
      setShowAddModal(false);
      setEditingService(null);
    } catch (error) {
      console.error(`Error ${editingService ? 'updating' : 'adding'} service:`, error);
    }
  };

  const handleDeleteService = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      setServices(prevServices => prevServices.filter(service => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <div className="header-buttons">
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            Add Service
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-state-icon">📦</div>
            <h2>No Services Yet</h2>
            <p>Start by adding your first service to your dashboard</p>
            <button 
              className="add-first-service-button"
              onClick={() => setShowAddModal(true)}
            >
              Add Your First Service
            </button>
          </div>
        </div>
      ) : (
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteService}
              onEdit={handleEditService}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddServiceModal
          service={editingService}
          onAdd={handleAddService}
          onCancel={() => {
            setShowAddModal(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;