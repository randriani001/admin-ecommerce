import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category, Order, Product, User } from '@/types';
import { router, useForm } from '@inertiajs/react'
import React from 'react'
import Swal from 'sweetalert2';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    user: User
    orders: Order[]
}

export default function ProductForm({orders,user}: Props) {
    console.log(orders,user)

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        category_id: string;
        price: string;
        company: string;
        description?: string;
        image: File | null;
    }>({
        name: user ? user .name : '',
        email: user ? user.email : '',
        password: user ? user.password : '',
        role: user ? user.role : '',                   
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            // put('/dashboard/products/' + product.id, {
            //     onSuccess: () => {
            //         Swal.fire({
            //             title: "Success",
            //             text: "Update success",
            //             icon: "success"
            //         })
            //     }
            // })

            router.post(
                route('users.update', [user.id]), 
                {
                    ...data,
                    _method: "put", 
                }, 
                {
                    preserveScroll: true,
                },
            ); 
        } else (
            post(route('products.store')), {
                // '/dashboard/products'
                preserveScroll: true,
            });
        };

  return (
    <DashboardLayout>
        <div className='p-10'>
            <h2 className='text-lg font-medium'>User</h2>
            <p className='text-muted-foreground'>Create user form</p>

            <form onSubmit={handleSubmit} className='w-full mt-5 space-y-5 max-w-2xl'>
                <div className='w-full'>
                    <Label>Name</Label>
                        <Input name='name' value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className='text-red-500'>{errors.name}</p>}
                </div>

                {/* <div className="space-y-2">
                    <Label>Order</Label>
                    <Select required value={data.category_id} onValueChange={(e) => setData('category_id', e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    {orders.map((order) => (
                                        <SelectItem value={order.id}>{user.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                        {errors.order_id && <p className="mt-2 text-red-500">{errors.order_id}</p>}
                </div> */}
                
                <div className='w-full space-y-2'>
                    <Label>Email</Label>
                    <Input value={data.email} onChange={e => setData('email', e.target.value)} name='email' required />
                    {errors.email && <p className="mt-2 text-red-500">{errors.email}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Password</Label>
                    <Input value={data.password} onChange={e => setData('password', e.target.value)} name='password' required />
                    {errors.password && <p className="mt-2 text-red-500">{errors.password}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Role</Label>
                    <Textarea value={data.role} onChange={e => setData('role', e.target.value)} />
                    {errors.role && <p className="mt-2 text-red-500">{errors.role}</p>}
                </div>
                <Button disabled={processing}>Submit</Button>
            </form>
        </div>
    </DashboardLayout>
  )
}
