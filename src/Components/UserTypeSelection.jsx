/* eslint-disable react/prop-types */
// UserTypeSelection.js
import  { useState } from 'react';
import { UserIcon, UsersIcon } from '@heroicons/react/outline'; // Importing icons
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = ({ onSelectUserType }) => {
  const [selectedType, setSelectedType] = useState(null);

  const Navigate = useNavigate();
  const handleSelect = (type) => {
    setSelectedType(type);
    onSelectUserType(type);
    if(type=='manufacturer'){
        Navigate('/login');
    }
    else{
        Navigate('/customer-login');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Select User Type</h2>
      <div className="flex gap-4">
        <button
          onClick={() => handleSelect('manufacturer')}
          className={`flex items-center justify-center px-4 py-2 rounded-lg ${
            selectedType === 'manufacturer'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <UserIcon className="w-6 h-6 mr-2" />
          Manufacturer
        </button>
        <button
          onClick={() => handleSelect('customer')}
          className={`flex items-center justify-center px-4 py-2 rounded-lg ${
            selectedType === 'customer'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          <UsersIcon className="w-6 h-6 mr-2" />
          Customer
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;