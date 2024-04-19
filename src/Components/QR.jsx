import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import Web3 from 'web3';
import { PostNavBar } from './PostNavBar';

const QR = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [product, setProduct] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // For loading indicator

  // Connect to Ethereum provider
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

  // Instantiate your contract
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

  // Function to retrieve product from blockchain
  const getProductFromBlockchain = async (qrCodeData) => {
    try {
      setLoading(true); // Activate loading indicator
      const productData = await contract.methods.getProductBySalt(qrCodeData).call();
      setProduct(productData);
    } catch (error) {
      console.error('Error retrieving product:', error);
      alert('Error retrieving product. Please try again.');
    } finally {
      setLoading(false); // Deactivate loading indicator
    }
  };
  
  useEffect(() => {
    if (qrCodeData) {
      getProductFromBlockchain(qrCodeData);
    }
  }, [qrCodeData]);

  const handleVerifyClick = () => {
    setIsCameraActive(true);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      decodeQRCode(imageSrc);
    } else {
      console.error('Failed to capture image');
    }
  };

  const handleBack = () => {
    navigate('/qr');
    window.location.reload(); // Refresh the page
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      decodeQRCode(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const decodeQRCode = (imageSrc) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setQrCodeData(code.data);
      } else {
        console.log('No QR code found');
      }
    };
    img.src = imageSrc;
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString(); // Customize date format as needed
  };

  return (
    <>
      <PostNavBar />
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold my-8">Verification Page</h1>
        {!isCameraActive ? (
          <>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleVerifyClick}
            >
              Verify
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Upload Image
            </label>
          </>
        ) : (
          <div>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
              ref={webcamRef}
              onUserMedia={() => console.log('User media is active')}
              className="mb-4 border border-gray-500"
            />
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCapture}
            >
              Capture
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        )}
        {loading && <p>Loading...</p>}
        {uploadedImage && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="max-w-full max-h-64 mx-auto"
            />
          </div>
        )}
         {/* Display product details */}
         {product && (
            <div className="border p-4 my-4">
                <h3 className="text-lg font-semibold">{product[0]}</h3>
                <p>Category: {product[1]}</p>
                <p>Brand: {product[2]}</p>
                <p>Manufacture Date: {formatDate(product[3])}</p>
                <p>Batch Number: {parseInt(product[4].toString())}</p>
                <p>Price: {parseInt(product[5].toString())}</p>
                <p>Expiry Date: {formatDate(product[6])}</p>
            </div>
        )}
      </div>
    </>
  );
};

export default QR;
