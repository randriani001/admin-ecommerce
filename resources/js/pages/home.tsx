import DashboardLayout from '@/components/layouts/dashboard-layout';
import { router } from '@inertiajs/react';
import React from 'react'

export default function HomePage() {
const handleLogout = () => {
  router.visit('/dashboard/logout', {
    method: "post"
  });
}

  return (
    <DashboardLayout>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </DashboardLayout>
  )
}
