// src/Components/ProfileField.tsx

import React from 'react';

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string | boolean | number; // Added number to value type
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isEditing: boolean;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'checkbox' | 'number' | 'password'; // Added password
  options?: string[]; // For 'select' type
  isReadOnly?: boolean; // NEW PROP: To explicitly make it always read-only
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  icon,
  label,
  name,
  value,
  onChange,
  isEditing,
  type = 'text',
  options,
  isReadOnly = false, // Default to false
}) => {
  const isCheckbox = type === 'checkbox';
  const isSelect = type === 'select';

  // Determine if the field should render an input/select or just display text
  // It renders an input ONLY if isEditing is true AND it's NOT read-only
  const shouldRenderInput = isEditing && !isReadOnly;

  const renderInput = () => {
    if (isSelect) {
      return (
        <select
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          disabled={!shouldRenderInput} // Disable if not in editing mode or is read-only
          className="w-full p-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">{`Select ${label}`}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (isCheckbox) {
      return (
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value as boolean}
          onChange={onChange}
          disabled={!shouldRenderInput} // Disable if not in editing mode or is read-only
          className="h-5 w-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
        />
      );
    } else {
      return (
        <input
          type={type}
          id={name}
          name={name}
          value={value as string | number} // value can be string or number
          onChange={onChange}
          disabled={!shouldRenderInput} // Disable if not in editing mode or is read-only
          className="w-full p-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      );
    }
  };

  // Determine the display value for non-input state
  const displayValue = () => {
    if (isCheckbox) {
      return value ? 'Enabled' : 'Disabled';
    }
    // Handle date format for display if type is 'date' and value is a valid date string
    if (type === 'date' && typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // You might want to format this more user-friendly here, e.g., using a date library
        // For now, just return the string as is, or parse if needed.
        return value;
    }
    return value || 'N/A'; // Default display for other types, or 'N/A' if value is falsy
  };


  return (
    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md">
      <div className="text-2xl mr-4">
        {icon}
      </div>
      <div className="flex-grow">
        <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">
          {label}:
        </label>
        {shouldRenderInput ? ( // Use shouldRenderInput here
          renderInput()
        ) : (
          <p className={`text-gray-200 ${isCheckbox ? 'inline-block ml-2' : ''}`}>
            {displayValue()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileField;