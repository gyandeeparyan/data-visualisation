"use client"


import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import  BarChartComponent from "@/components/charts/BarChartComponent"
import LineChartComponent from "@/components/charts/LineChartComponent";
export default function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Optional loading state

  const handleLogout = async () => {
    console.log('Logout button clicked'); // Debug log
    setLoading(true); // Set loading state if desired
    try {
      await router.replace('/login');
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout. Please try again.');
      }

      logout(); // Clear user data in context
      console.log('Logout successful, navigating to login'); // Debug log
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false); // Reset loading state if used
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleLogout} disabled={loading}>Logout</button>
      <main className="flex md:flex-row flex-col gap-8 row-start-2 items-center sm:items-start">
        
       <BarChartComponent/>
       <LineChartComponent/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer content... */}
      </footer>
    </div>
  );
}
