import React, { useState, useEffect } from 'react';
import IconSelector from './IconSelector';

const EMOJI_OPTIONS = ['🎬', '🎮', '📚', '🎵', '📱', '💻', '🌐', '📊', '🎨', '📷'];

function AddServiceModal({ service, onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('fa-globe');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setName(service.name);
      setUrl(service.url);
      setIcon(service.icon);
    }
  }, [service]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!url) newErrors.url = 'URL is required';
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd({
        id: service?.id || Date.now(),
        name,
        url,
        icon
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Service Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="url">Service URL</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={errors.url ? 'error' : ''}
            />
            {errors.url && <span className="error-message">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label>Icon</label>
            <IconSelector
              selectedIcon={icon}
              onSelect={setIcon}
            />
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {service ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;