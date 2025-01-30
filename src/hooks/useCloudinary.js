import {useState} from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message'; // Import the toast library

const useCloudinaryUpload = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); // New state for progress

  const uploadFile = async file => {
    setLoading(true);
    setError(null);
    setProgress(0); // Reset progress before starting

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mystore');
    data.append('folder', 'chatSystem');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/devtrendy/image/upload',
        data,
        {
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setProgress(percentCompleted); // Update progress
          },
        },
      );
      setUrl(res.data.url);
      return res.data.secure_url;
    } catch (err) {
      console.error('Error uploading image: ', err);
      const errorMessage =
        err.response?.data?.message || 'An error occurred during upload.';
      setError(errorMessage);

      // Show error toast
      Toast.show({
        type: 'error', // Type of toast
        text1: 'Upload Failed', // Main message
        text2: errorMessage, // Secondary message (error details)
        position: 'top', // Position of the toast
        visibilityTime: 3000, // Duration of the toast
        autoHide: true, // Auto-hide the toast
      });
    } finally {
      setLoading(false);
    }
  };

  return {url, loading, error, progress, uploadFile}; // Include progress in return
};

export default useCloudinaryUpload;
