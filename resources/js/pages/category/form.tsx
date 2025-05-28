import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2';

interface Category {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    category: Category
}

export default function CategoryForm({category}: Props) {
    console.log(category)

    const {data, setData, post, errors, put} = useForm({
        name: category ? category.name : ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();

         if (category) {
            put('/dashboard/categories/' + category.id, {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success",
                        text: "Update success",
                        icon: "success"
                    })
                }
            })
         } else (
            post('/dashboard/categories')
         )};

         //post('/dashboard/categories');

  return (
    <DashboardLayout>
        <div>
            <h2>Category</h2>
            <p>Form Category</p>
        </div>

        <form onSubmit={handleSubmit} className='max-lg mt-5 space-y-5'>
            <div className='space-y-2'>
                <label htmlFor="">Name</label>
                <input 
                    name='name' value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'/>
                {errors.name && <p className='text-red-500'>{errors.name}</p>}
            </div>
            <Button>Submit</Button>
        </form>
    </DashboardLayout>
  )
}
