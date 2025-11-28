import React from 'react';

const sidebarStyles = {
  width: '240px',
  flexShrink: 0,
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  height: 'fit-content',
};

const titleStyles = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px',
  borderBottom: '1px solid #e5e7eb',
  paddingBottom: '12px',
};

const listStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyles = {
  padding: '8px 0',
  cursor: 'pointer',
  color: '#374151',
  fontWeight: '500',
};

const activeListItemStyles = {
  ...listItemStyles,
  color: '#2e9b1f',
  fontWeight: '700',
};

export default function FilterSidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside style={sidebarStyles}>
      <h3 style={titleStyles}>Categorías</h3>
      <ul style={listStyles}>
        <li
          style={!selectedCategory ? activeListItemStyles : listItemStyles}
          onClick={() => onSelectCategory(null)} // Opción para mostrar todas
        >
          Todas
        </li>
        {categories.map(category => (
          <li
            key={category}
            style={selectedCategory === category ? activeListItemStyles : listItemStyles}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}