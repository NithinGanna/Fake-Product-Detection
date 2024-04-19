import React, { useState } from 'react';
import { PostNavBar } from './PostNavBar';
import Web3 from 'web3';
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';
import { FaDownload } from 'react-icons/fa';
import { ToastContainer,toast,Slide } from 'react-toastify';


function AddProductForm() {
  const [formData, setFormData] = useState({
    productId: '', // New field
    name: '',
    brand: '',
    price: '',
    category: 'Select category',
    batchNumber: '',
    manufactureDate: '',
    description: '',
    expiryDate: ''
  });

  const [showQRCode, setShowQRCode] = useState(false);

  // Connect to Ethereum provider 
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

  // Instantiate your contract
  const contractAddress = '0x5D719d78c1Ab55B00ba07f40D7EC19457493A3D9'; // Replace with your contract address

  const contractABI =  [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_brand",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_manufactureDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_batchNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiryDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_salt",
          "type": "string"
        }
      ],
      "name": "addProductWithExpiry",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_brand",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_manufactureDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_batchNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_salt",
          "type": "string"
        }
      ],
      "name": "addProductWithoutExpiry",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "ProductAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "ProductRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        }
      ],
      "name": "ProductUpdated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        }
      ],
      "name": "removeProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_brand",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_manufactureDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_batchNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiryDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_salt",
          "type": "string"
        }
      ],
      "name": "updateProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "_saltValue",
          "type": "string"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "_saltValue",
          "type": "string"
        }
      ],
      "name": "getProductBySalt",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "productCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        }
      ],
      "name": "productExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "productIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "brand",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "manufactureDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "batchNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiryDate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "saltValue",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]; // Your contract ABI

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  async function addProductToBlockchain(formData) {
    try {
      const accounts = await web3.eth.getAccounts(); // Get the current user's Ethereum account
  
      console.log(accounts[0]);
  
      // Call the appropriate function based on the category
      if (formData.category === 'MD' || formData.category === 'FD') {
        // Add product with expiry date
        await contract.methods.addProductWithExpiry(
          formData.name,
          formData.category,
          formData.brand,
          formData.productId, // Use the provided productId
          new Date(formData.manufactureDate).getTime(), // Convert manufacture date to Unix timestamp
          formData.batchNumber,
          formData.price,
          new Date(formData.expiryDate).getTime(), // Convert expiry date to Unix timestamp
          formData.saltValue // Pass saltValue
        ).send({ from : accounts[0] , gas: 5000000 });
      } else {
        // Add product without expiry date
        await contract.methods.addProductWithoutExpiry(
          formData.name,
          formData.category,
          formData.brand,
          formData.productId, // Use the provided productId
          new Date(formData.manufactureDate).getTime(), // Convert manufacture date to Unix timestamp
          formData.batchNumber,
          formData.price,
          formData.saltValue // Pass saltValue
        ).send({ from : accounts[0] , gas: 5000000 });
      }
  
      // Handle success
      console.log('Product added successfully to the blockchain.');
      toast.success('Product added successfully to the blockchain.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      setShowQRCode(true); // Show QR code after successful submission
      // Reset the form data after success
      setFormData({
        productId: '', // Reset productId
        name: '',
        brand: '',
        price: '',
        category: 'Select category',
        batchNumber: '',
        manufactureDate: '',
        description: '',
        expiryDate: ''
      });
    } catch (error) {
      // Handle error
      console.error('Error adding product to the blockchain:', error);
      toast.error('An Error occured while adding product to the blockchain.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [hashedSaltValue,setHashedSaltValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    // Concatenate productId and brand to form saltValue
    const saltValue = formData.productId + '-' + formData.brand + '-' + formData.name;

    // Hash the salt value
    const hashedSalt = CryptoJS.SHA256(saltValue).toString();

    setHashedSaltValue(hashedSalt);
  
    await addProductToBlockchain({
      ...formData,
      saltValue: hashedSalt // Add saltValue to form data
    }); // Call function to add product to the blockchain
  };


  const handleDownload = async () => {
    // Find the QR code container by its class name
    const qrCodeContainer = document.getElementsByClassName('qr-code-container')[0];

    // Dynamically import html-to-image library
    const { toPng } = await import('html-to-image');

    // Convert the QR code container to an image
    toPng(qrCodeContainer)
      .then(function (dataUrl) {
        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'qr_code.png';
        downloadLink.click();
      });
  };



  const showExpiryDate = formData.category === 'FD' || formData.category === 'MD'; // Show expiry date for Food Items and Medicines

  return (
    <>
      <PostNavBar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-5">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
                <input
                  type="text"
                  name="productId"
                  id="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product ID"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="Select category" disabled>Select category</option>
                  <option value="FD">Food Items</option>
                  <option value="MD">Medicines</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="0/-"
                  required
                />
              </div>
              <div>
                <label htmlFor="batch-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batch Number</label>
                <input
                  type="number"
                  name="batchNumber"
                  id="batch-number"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Batch number"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="manufacture-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manufacture Date</label>
                <input
                  type="date"
                  name="manufactureDate"
                  id="manufacture-date"
                  value={formData.manufactureDate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              {showExpiryDate && ( // Conditionally render the expiry date input field
                <div className="w-full">
                  <label htmlFor="expiry-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    id="expiry-date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
          {showQRCode && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">QR Code</h3>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md qr-code-container">
                  <QRCode value={hashedSaltValue} />
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-1 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-md focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  <span>Download</span>
                  <FaDownload className="ml-2" />
                </button>
            </div>
          )}
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}

export default AddProductForm;


