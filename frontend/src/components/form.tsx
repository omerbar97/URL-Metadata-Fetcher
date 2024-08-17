import { useState } from 'react';
import { FormResponse } from '../types/form';

const UserForm = () => {
  const [urls, setUrls] = useState<string[]>(['', '', '']);
  const [metadata, setMetadata] = useState<FormResponse[]>([]);
  const [error, setError] = useState('');

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddMoreUrls = () => {
      const newVal = urls.concat('')
      setUrls(newVal)
  };

  const handleRemoveFromBottom = () => {
    if (urls.length <= 3) {
        // adding value
        alert("Minimun of 3 sites must be requested")
        return
    }
    const newVal = urls.filter((v,i) => i !== urls.length - 1)
    setUrls(newVal)
};

  const handleSubmit = async (e: HTMLFormElement) => {
    e.preventDefault();
    setError('');
    setMetadata([]);
    try {
      const response = await axios.post('/fetch-metadata', { urls });
      setMetadata(response.data);
    } catch (err) {
      setError('Failed to fetch metadata for one or more URLs');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Fetch URL Metadata</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow">
        {urls.map((url, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              URL {index + 1}
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder="Enter URL"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <div className="flex flex-row m-auto">
        <button className="text-white bg-blue-800 left m-auto hover:bg-blue-600 transition p-3 rounded-2xl" onClick={handleAddMoreUrls}>Add URLS</button>
        <button className="text-white bg-blue-800 right m-auto hover:bg-blue-600 transition p-3 rounded-2xl" onClick={handleRemoveFromBottom}>Remove from bottom</button>
        </div>
        <button
          type="submit"
          className="mt-5 justify-center m-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default UserForm;
