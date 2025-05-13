import React from 'react';

function ServiceCard({ service, onDelete, onEdit }) {
  const handleCardClick = (e) => {
    // Don't open URL if clicking on edit or delete buttons
    if (e.target.closest('.edit-button') || e.target.closest('.delete-button')) {
      return;
    }
    window.open(service.url, '_blank');
  };

  return (
    <div className="service-card" onClick={handleCardClick}>
      {/* Delete and Edit Buttons */}
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(service.id);
        }}
      >
        ✖️
      </button>
      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(service);
        }}
      >
        ✏️
      </button>

      {/* Card Content */}
      <div className="card-content">
        <div className="service-icon">{service.icon}</div>
        <h3 className="service-name">{service.name}</h3>
        <p className="service-url">{service.url}</p>
      </div>
    </div>
  );
}

export default ServiceCard;