import React from 'react'
import { Head } from '@inertiajs/react'
import DashboardLayout from '@/components/layouts/dashboard-layout'

export default function profile() {

  return (
    <>
    <Head title="Profile" />
    <DashboardLayout>
      <h1>Hello Profile</h1>
    </DashboardLayout>
    </>
  )
};
