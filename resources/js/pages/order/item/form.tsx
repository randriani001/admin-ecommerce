import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Order, OrderItem } from '@/types';
import { useForm } from '@inertiajs/react'
import React from 'react'
import { Label } from 'recharts';
import Swal from 'sweetalert2';

interface Props {
    order: Order;
    item?: OrderItem
}

export default function OrderForm({item, order}: Props) {
    console.log(item, order)

    const {data, setData, post, errors, put, processing} = useForm<{
        order_id: string;
        product_variant_id: string;
        quantity: string;
        price: string;
    }>({
        order_id: order ? order.id : '',
        product_variant_id: item ? item.product_variant_id : '',
        quantity: item ? item.quantity : '',
        price: item ? item.price : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();

         if (order) {
            put(route('orders.items.update', [order.id, item?.order_id]), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success",
                        text: "Update success",
                        icon: "success"
                    })
                }
            })
         } else (
            post(route('orders.items.store'))
         )};


 return (
    <DashboardLayout>
        <div className='p-10'>
            <h2 className='text-lg font-medium'>Order</h2>
            <p className='text-muted-foreground'>Create order form</p>

            <form onSubmit={handleSubmit} className='w-full mt-5 space-y-5 max-w-2xl'>
                <div className='w-full'>
                    <Label>Product Variant ID</Label>
                    <Input name='product_variant_id' value={data.product_variant_id} onChange={e => setData('product_variant_id', e.target.value)} />
                    {errors.product_variant_id && <p className='text-red-500'>{errors.product_variant_id}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Quantity</Label>
                    <Input value={data.quantity} onChange={e => setData('quantity', e.target.value)} name='quantity' required />
                    {errors.quantity && <p className="mt-2 text-red-500">{errors.quantity}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Price</Label>
                    <Input value={data.price} onChange={e => setData('price', e.target.value)} name='price' required />
                    {errors.price && <p className="mt-2 text-red-500">{errors.price}</p>}
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
