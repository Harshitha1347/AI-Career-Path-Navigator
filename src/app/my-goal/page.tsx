'use client';

import { useState } from 'react';
async function generateRoadmap() {
  <button onClick={generateRoadmap}>Generate Roadmap</button>;
}

export default function MyGoalPage() {
  const [goal, setGoal] = useState('');

  const generateRoadmap = () => {
    alert('Generate roadmap for ' + goal);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Choose Your Dream Career</h1>

      <input
        type="text"
        placeholder="Enter your dream job"

        value={goal}

        onChange={(e) => setGoal(e.target.value)}

        className="w-full p-4 rounded-lg border"
      />

      <button className="mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg">
        Generate Roadmap
      </button>
    </div>
  );
}
