import React, { useState, useEffect } from 'react';

const iconOptions = ['🌐', '📺', '🎬', '☁️', '📁', '🎮', '🔒', '📊', '📝', '📧'];

function AddServiceModal({ service, onAdd, onCancel }) {
  const [name, setName] = useState(service ? service.name : '');
  const [url, setUrl] = useState(service ? service.url : '');
  const [icon, setIcon] = useState(service ? service.icon : '🌐');

  useEffect(() => {
    if (service) {
      setName(service.name);
      setUrl(service.url);
      setIcon(service.icon);
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && url) {
      onAdd({ id: service ? service.id : Date.now(), name, url, icon });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="service-name">Service Name</label>
            <input
              type="text"
              id="service-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jellyfin"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="service-url">Service URL</label>
            <input
              type="url"
              id="service-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-service.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Choose Icon</label>
            <div className="icon-selector">
              {iconOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`icon-option ${icon === option ? 'selected' : ''}`}
                  onClick={() => setIcon(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="add-button">
              {service ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;