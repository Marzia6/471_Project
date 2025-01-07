import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingProgram = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUser(response.data.user);
  };

  const fetchModules = async () => {
    try {
      console.log("Fetching modules..."); 
      const response = await axios.get('http://localhost:5000/api/training/modules');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchUser();
    fetchModules();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading training modules...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Companion Training Program</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map(module => (
          <div key={module._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
            <p className="mb-4">{module.content}</p>
            
            {/* Resources section */}
            <div className="space-y-2">
              {module.resources?.map((resource, index) => (
                <a
                  key={index}
                  href={resource}
                  className="text-blue-600 hover:underline block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resource {index + 1}
                </a>
              ))}
            </div>

            {/* Interactive content section */}
            {module.interactiveContent?.map((content, index) => (
              <div key={index} className="mt-4 p-4 bg-gray-50 rounded">
                <p className="font-medium">{content.content}</p>
                <input 
                  type="text"
                  className="mt-2 w-full p-2 border rounded"
                  placeholder="Enter your response"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingProgram;
