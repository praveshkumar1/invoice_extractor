import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFileData, setFileUploadStatus } from '../redux/actions/fileActions';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    dispatch(setFileUploadStatus('uploading'));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('invoice-extractor-phi.vercel.app/process-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the file.');
      }

      const result = await response.json();
      console.log('this is the result ', result);
      dispatch(setFileData(result.invoice)); // Store invoice data in Redux store
      dispatch(setFileUploadStatus('success'));
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the file.');
      dispatch(setFileUploadStatus('failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>File Upload and Processing</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
