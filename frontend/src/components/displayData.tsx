import React from 'react';
import FormResponse from '../types/form';

type DisplayDataProps = {
  data: FormResponse[];
};

const DisplayData: React.FC<DisplayDataProps> = ({ data }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Fetched Metadata</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition duration-300"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="mb-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Image for ${item.title}`}
                    className="w-full h-48 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-3">{item.description}</p>
              {item.isFailed ? (
                <p className="text-red-500">Failed to fetch metadata</p>
              ) : (
                <p className="text-blue-500 hover:underline">Visit Site</p>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayData;
