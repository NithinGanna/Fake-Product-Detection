import React, { useState } from 'react';
import Web3 from 'web3';
import { PostNavBar } from './PostNavBar';

const RetrieveProduct = () => {
  const [productId, setProductId] = useState('');
  const [retrievedProduct, setRetrievedProduct] = useState(null);

  // Connect to Ethereum provider
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

  // Instantiate your contract
  const contractAddress = '0x45404ACB3321E51C544D9e0303228FA39ba9C15d'; // Replace with your contract address
  const contractABI = [
	{
		"constant": false,
		"inputs": [
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
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with your contract ABI
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Function to retrieve product from blockchain
  const getProductFromBlockchain = async () => {
    try {
      // Call the getProduct function in your contract
      const productData = await contract.methods.getProduct(productId).call();
      setRetrievedProduct({
        category: productData[0],
        brand: productData[1],
        manufactureDate: productData[2].toString(), // Convert BigInt to string
        batchNumber: parseInt(productData[3].toString()), // Convert BigInt to integer
        price: parseInt(productData[4].toString()) // Convert BigInt to integer
      });
    } catch (error) {
      console.error('Error retrieving product:', error);
      alert('Error retrieving product. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getProductFromBlockchain();
  };

  return (
    <>
      <PostNavBar />
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
            <button type="submit" className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">Retrieve Product</button>
          </form>
          {retrievedProduct && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Retrieved Product Details</h2>
              <p><strong>Category:</strong> {retrievedProduct.category}</p>
              <p><strong>Brand:</strong> {retrievedProduct.brand}</p>
              <p><strong>Manufacture Date:</strong> {retrievedProduct.manufactureDate}</p>
              <p><strong>Batch Number:</strong> {retrievedProduct.batchNumber}</p>
              <p><strong>Price:</strong> {retrievedProduct.price}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RetrieveProduct;
