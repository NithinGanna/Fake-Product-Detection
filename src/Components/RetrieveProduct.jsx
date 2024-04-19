import React, { useState } from 'react';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostNavBar } from './PostNavBar';

const RetrieveProduct = () => {
  const [productId, setProductId] = useState('');
  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [retrievedProduct, setRetrievedProduct] = useState(null);

  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

  const contractAddress = '0x5D719d78c1Ab55B00ba07f40D7EC19457493A3D9';
  const contractABI = [
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
];

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const getProductFromBlockchain = async () => {
    try {
      const salt = productId + '-' + brand + '-' + productName;
      const hashedSalt = CryptoJS.SHA256(salt).toString();
      const productData = await contract.methods.getProductBySalt(hashedSalt).call();
      setRetrievedProduct({
        name: productData[0],
        category: productData[1],
        brand: productData[2],
        manufactureDate: productData[3].toString(),
        batchNumber: parseInt(productData[4].toString()),
        price: parseInt(productData[5].toString()),
        expiryDate: productData[1] === 'FD' || productData[1] === 'MD' ? productData[6].toString() : null,
      });
    } catch (error) {
      console.error('Error retrieving product:', error);
      toast.error('An error occurred while retrieving.', {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getProductFromBlockchain();
  };

  return (
    <>
	<PostNavBar/>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Retrieve Product</h2>
            <div>
              <label htmlFor="productId" className="block mb-1">Product ID:</label>
              <input
                type="text"
                id="productId"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-1">Brand:</label>
              <input
                type="text"
                id="brand"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productName" className="block mb-1">Product Name:</label>
              <input
                type="text"
                id="productName"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <button type="submit" className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">Retrieve Product</button>
          </form>
          {retrievedProduct && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Retrieved Product Details</h2>
              <p><strong>Name:</strong> {retrievedProduct.name}</p>
              <p><strong>Category:</strong> {retrievedProduct.category}</p>
              <p><strong>Brand:</strong> {retrievedProduct.brand}</p>
              <p><strong>Manufacture Date:</strong> {retrievedProduct.manufactureDate}</p>
              <p><strong>Batch Number:</strong> {retrievedProduct.batchNumber}</p>
              <p><strong>Price:</strong> {retrievedProduct.price}</p>
              {retrievedProduct.expiryDate && (
                <p><strong>Expiry Date:</strong> {retrievedProduct.expiryDate}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RetrieveProduct;
