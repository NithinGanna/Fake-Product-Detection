// Home.js
import  { useState } from 'react';
import { PreNavBar } from '../Components/PreNavBar';
import UserTypeSelection from '../Components/UserTypeSelection';


const Home = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PreNavBar />
      <div className="flex-grow flex items-center justify-center">
        {!selectedUserType && (
          <UserTypeSelection onSelectUserType={handleUserTypeSelect} />
        )}
        {selectedUserType === 'manufacturer' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Manufacturer Login/Signup</h2>
            {/* Include manufacturer login/signup components */}
          </div>
        )}
        {selectedUserType === 'customer' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Login/Signup</h2>
            {/* Include customer login/signup components */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;