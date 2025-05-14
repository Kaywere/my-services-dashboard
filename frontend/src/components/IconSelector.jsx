import React, { useState } from 'react';

const EMOJI_CATEGORIES = {
  'Media': ['🎬', '🎥', '📺', '🎮', '🎵', '🎧', '🎤', '🎭', '📷', '🎪', '🎨', '🎯', '🎲', '🎳', '🎸', '🎹', '🎺', '🎻', '🎼'],
  'Social': ['💬', '📱', '🌐', '👥', '📧', '📨', '📢', '🔗', '💻', '📲', '💌', '📩', '📤', '📥', '📦', '📪', '📫', '📬', '📭', '📮'],
  'Tools': ['🛠️', '⚙️', '🔧', '📊', '📈', '📉', '🔍', '📝', '📋', '📌', '🔨', '🔩', '🪛', '⚒️'],
  'Storage': ['💾', '📁', '🗂️', '📦', '💿', '📀', '💽', '📼', '🗃️', '📂', '🗄️', '📥', '📤', '📨', '📩', '📪', '📫', '📭', '📮'],
  'Security': ['🔒', '🔑', '🛡️', '⚔️', '✅', '🔏', '🔓', '🔐'],
  'Monitoring': ['📊', '📈', '📉', '⏰', '🔔', '🔕', '📡', '📶', '📱', '💻'],
  'Development': ['💻', '⌨️', '🖥️', '📱', '💾', '📀', '🔌', '🔋', '💿', '📼', '📺', '📡', '📶', '🖱️'],
  'Business': ['💼', '📊', '📈', '📉', '💳', '💰', '💵', '💸', '📋', '📝', '📑', '📌', '📍', '📎', '📏', '📐', '✏️'],
  'Communication': ['📞', '📱', '📲', '💬', '📨', '📩', '📧', '📤', '📥', '📦', '📪', '📫', '📬', '📭', '📮', '📯'],
  'Analytics': ['📊', '📈', '📉', '📋', '📝', '📑', '📌', '📍', '📎', '📏', '📐', '✏️'],
  'Cloud': ['☁️', '🌥️', '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '🌪️', '🌫️', '🌬️', '☀️', '🌤️'],
  'AI & ML': ['🤖', '👾', '🎮', '🎲', '🎯', '🎨', '🎭', '🎪'],
  'Other': ['⭐', '❤️', '🔖', '🏷️', '📌', '📍', '🎯', '🎨', '🎭', '🎪', '🎲', '🎮', '👾', '🤖']
};

function IconSelector({ selectedIcon, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('Media');

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji);
  };

  return (
    <div className="icon-selector">
      <div className="icon-categories">
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <button
            key={category}
            type="button"
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="icon-grid">
        {EMOJI_CATEGORIES[activeCategory].map((emoji, index) => (
          <button
            key={`${emoji}-${index}`}
            type="button"
            className={`icon-option ${selectedIcon === emoji ? 'selected' : ''}`}
            onClick={() => handleEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default IconSelector;
