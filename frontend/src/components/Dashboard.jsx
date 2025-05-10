import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import AddServiceModal from './AddServiceModal';

function Dashboard({ onLogout }) {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleAddService = async (newService) => {
    const updatedServices = editingService
      ? services.map(service => (service.id === editingService.id ? newService : service))
      : [...services, newService];

    try {
      // Save to backend
      await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServices),
      });

      // Fetch updated data from backend
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error saving services:', error);
    }

    setShowAddModal(false);
    setEditingService(null);
  };

  const handleDeleteService = async (id) => {
    const updatedServices = services.filter(service => service.id !== id);

    try {
      // Save to backend
      await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedServices),
      });

      // Fetch updated data from backend
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error saving services:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowAddModal(true);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Services Dashboard</h1>
        <div className="header-buttons">
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            Add Service
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

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