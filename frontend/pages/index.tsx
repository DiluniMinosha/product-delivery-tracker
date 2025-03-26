// frontend/pages/index.tsx

import React from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Dashboard
        title="Product Delivery Tracker"
        description="Track the status of product deliveries in real-time"
      />
    </div>
  );
}
