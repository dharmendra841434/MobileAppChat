import {useState} from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message'; // Import the toast library

const useCloudinaryUpload = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); // New state for progress

  const uploadFile = async fileData => {
    setLoading(true);
    setError(null);
    setProgress(0); // Reset progress before starting

    const {uri, fileName, type} = fileData;

    const data = new FormData();
    data.append('file', {
      uri,
      name: fileName, // Use extracted file name
      type, // Use extracted MIME type
    });
    data.append('upload_preset', 'mystore');
    data.append('folder', 'chatSystem');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/devtrendy/image/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setProgress(percentCompleted); // Update progress
          },
        },
      );
      setUrl(res.data.secure_url);
      return res.data.secure_url;
    } catch (err) {
      console.error('Error uploading image: ', err);
      const errorMessage =
        err.response?.data?.message || 'An error occurred during upload.';
      setError(errorMessage);

      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: errorMessage,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {url, loading, error, progress, uploadFile}; // Include progress in return
};

export default useCloudinaryUpload;
