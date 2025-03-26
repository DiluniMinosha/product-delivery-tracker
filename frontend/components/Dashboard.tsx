// frontend/components/Dashboard.tsx

import React from 'react';

interface DashboardProps {
  title: string;
  description: string;
}

const Dashboard: React.FC<DashboardProps> = ({ title, description }) => {
  return (
    <div className="dashboard-container p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <p className="mt-2 text-center text-lg">{description}</p>
      {/* Add more dashboard-related content here */}
    </div>
  );
};

export default Dashboard;
