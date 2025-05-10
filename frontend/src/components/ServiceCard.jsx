import React from 'react';

function ServiceCard({ service, onDelete, onEdit }) {
  const handleNameClick = () => {
    window.open(service.url, '_blank');
  };

  return (
    <div className="service-card">
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
        <h3 className="service-name" onClick={handleNameClick}>
          {service.name}
        </h3>
        <p className="service-url">{service.url}</p>
      </div>
    </div>
  );
}

export default ServiceCard;