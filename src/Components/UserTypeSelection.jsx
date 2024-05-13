import { useState } from 'react';
import { UserIcon, UsersIcon } from '@heroicons/react/outline'; // Importing icons
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'


const UserTypeSelection = ({ onSelectUserType }) => {
  const [selectedType, setSelectedType] = useState(null);
  const Navigate = useNavigate();

  const handleSelect = (type) => {
    setSelectedType(type);
    onSelectUserType(type);
    if (type === 'manufacturer') {
      Navigate('/login');
    } else {
      Navigate('/customer-login');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:items-center">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <img src="login_img_2.png" alt="Your Image" className="w-full h-auto" />
      </div>
      {/* User Type Selection */}
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-8" style={{fontSize: '44px',fontFamily: 'Times New Roman, serif'}}>
            Select User Type
          </h1>
          <div className="flex flex-col lg:flex-row gap-4" style={{marginTop:'15px'}}>
            <Button colorScheme='teal' variant='solid'
              onClick={() => handleSelect('manufacturer')}
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition duration-300 ${
                selectedType === 'manufacturer'
                  ? 'bg-white-500 text-white hover:bg-white-600 hover:text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-white-100 hover:text-white-700'
              }`}
            >
              <UserIcon className="w-6 h-6 mr-2" />
              Manufacturer
            </Button>
            <Button colorScheme='teal' variant='solid'
              onClick={() => handleSelect('customer')}
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition duration-300 ${
                selectedType === 'manufacturer'
                  ? 'bg-white-500 text-white hover:bg-white-600 hover:text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-white-100 hover:text-white-700'
              }`}
            >
              <UsersIcon className="w-6 h-6 mr-2" />
              Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
