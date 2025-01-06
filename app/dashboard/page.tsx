'use client';
import { useEffect, useState } from "react";





const Dashboard = () => {
  // const { data: session, status } = useSession(); // Google auth user
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hasFetched, setHasFetched] = useState(false); // Track fetch completion

  return (
    <>
      <h1>Admin Dashboard</h1>
    </>
  );
};

export default Dashboard;
