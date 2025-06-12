import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order, OrderItem } from '@/types';
import { useForm } from '@inertiajs/react'
import { Select, SelectLabel } from '@radix-ui/react-select';
import { Upload, X } from 'lucide-react';
import React from 'react'
import { Label } from 'recharts';
import Swal from 'sweetalert2';

interface Props {
    order: Order;
    orderItems: OrderItem[];
}

export default function OrderForm({orderItems,order}: Props) {
    console.log(order)

    const {data, setData, post, errors, put, processing} = useForm<{
        user_id: string;
        address: string;
        phone: string;
        total: string;
        status: string;
        url: string;
        payment_method: string;
        payment_channel: string;
        postal_code: string;
        country: string;
    }>({
        user_id: order ? order.id : '',
        address: order ? order.address : '',
        phone: order ? order.phone : '',
        total: order ? order.total : '',
        status: order ? order.status : '',
        url: order ? order.url : '',
        payment_method: order ? order.payment_method : '',
        payment_channel: order ? order.payment_channel : '',
        postal_code: order ? order.postal_code : '',
        country: order ? order.country : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();

         if (order) {
            put(route('orders.update', [order.id]), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success",
                        text: "Update success",
                        icon: "success"
                    })
                }
            })
         } else (
            post(route('orders.store'))
         )};


  return (
    <DashboardLayout>
        <div className='p-10'>
            <h2 className='text-lg font-medium'>Order</h2>
            <p className='text-muted-foreground'>Create order form</p>

            <form onSubmit={handleSubmit} className='w-full mt-5 space-y-5 max-w-2xl'>
                <div className='w-full'>
                    <Label>User ID</Label>
                    <Input name='user_id' value={data.user_id} onChange={e => setData('user_id', e.target.value)} />
                    {errors.user_id && <p className='text-red-500'>{errors.user_id}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Address</Label>
                    <Input value={data.address} onChange={e => setData('address', e.target.value)} name='address' required />
                    {errors.address && <p className="mt-2 text-red-500">{errors.address}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Phone</Label>
                    <Input value={data.phone} onChange={e => setData('phone', e.target.value)} name='phone' required />
                    {errors.phone && <p className="mt-2 text-red-500">{errors.phone}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Total</Label>
                    <Input value={data.total} onChange={e => setData('total', e.target.value)} name='total' required />
                    {errors.total && <p className="mt-2 text-red-500">{errors.total}</p>}
                </div>    

                 <div className='w-full space-y-2'>
                    <Label>Status</Label>
                    <Input value={data.status} onChange={e => setData('status', e.target.value)} name='status' required />
                    {errors.status && <p className="mt-2 text-red-500">{errors.status}</p>}
                </div>   

                <div className='w-full space-y-2'>
                    <Label>URL</Label>
                    <Input value={data.url} onChange={e => setData('url', e.target.value)} name='url' required />
                    {errors.url && <p className="mt-2 text-red-500">{errors.url}</p>}
                </div>  

                <div className='w-full space-y-2'>
                    <Label>Payment Method</Label>
                    <Input value={data.payment_method} onChange={e => setData('payment_method', e.target.value)} name='payment_method' required />
                    {errors.payment_method && <p className="mt-2 text-red-500">{errors.payment_method}</p>}
                </div>   

                <div className='w-full space-y-2'>
                    <Label>Payment Channel</Label>
                    <Input value={data.payment_channel} onChange={e => setData('payment_channel', e.target.value)} name='payment_channel' required />
                    {errors.payment_channel && <p className="mt-2 text-red-500">{errors.payment_channel}</p>}
                </div> 

                <div className='w-full space-y-2'>
                    <Label>Postal Code</Label>
                    <Input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} name='postal_code' required />
                    {errors.postal_code && <p className="mt-2 text-red-500">{errors.postal_code}</p>}
                </div> 
                
                <div className='w-full space-y-2'>
                    <Label>Country</Label>
                    <Input value={data.country} onChange={e => setData('country', e.target.value)} name='country' required />
                    {errors.country && <p className="mt-2 text-red-500">{errors.country}</p>}
                </div>

                {/* <div className='space-y-2'>
                    <Label>Image</Label>
                    <FileUpload
                        name="image"
                        maxFiles={1}
                        accept="image/*"
                        maxSize={5 * 1024 * 1024}
                        className="w-full"
                        value={data.image ? [data.image] : undefined}
                        onValueChange={(e) => setData('image', e[0])}
                    >
                    <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <div className="flex items-center justify-center rounded-full border p-2.5">
                                <Upload className="size-6 text-muted-foreground" />
                            </div>
                            <p className="font-medium text-sm">Drag & drop files here</p>
                            <p className="text-muted-foreground text-xs">
                                Or click to browse (max 2 files, up to 5MB each)
                            </p>
                        </div>
                        <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                            Browse files
                        </Button>
                        </FileUploadTrigger>
                    </FileUploadDropzone>
                    <FileUploadList>
                    {data.image && (
                        <FileUploadItem value={data.image}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                                <X />
                            </Button>
                            </FileUploadItemDelete>
                        </FileUploadItem>
                        )}
                    </FileUploadList>
                    </FileUpload>

                    {order?.image && !data.image && (
                        <div className='flex items-center gap-5 rounded-lg border p-3'>
                            <img 
                                className='aspect-square w-20 object-cover rounded' 
                                src={`http://127.0.0.1:8000/storage/${order.image}`} 
                                alt="" 
                            />      
                            <p>{order.image.replace('product/', '')}</p>
                        </div>
                        
                    )}    

                    {errors.image && <p className='text-red-500'>{errors.image}</p>}
                    </div> */}
                <Button disabled={processing}>Submit</Button>
            </form>
        </div>
    </DashboardLayout>
  )
};

