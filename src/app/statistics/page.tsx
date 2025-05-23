'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ReadingStats {
  bookId: number;
  title: string;
  pagesRead: number;
  date: string;
}

export default function Statistics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [stats, setStats] = useState<ReadingStats[]>([]);

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/statistics?range=${timeRange}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reading Statistics</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded ${
              timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded ${
              timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded ${
              timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pagesRead" name="Pages Read" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 