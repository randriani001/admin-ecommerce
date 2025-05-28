import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category, Product } from '@/types';
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
    product: Product
    categories: Category[]
}

export default function ProductForm({categories,product}: Props) {
    console.log(product)

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        category_id: string;
        price: string;
        company: string;
        description?: string;
        image: File | null;
    }>({
        name: product ? product.name : '',
        category_id: product ? product.category_id : '',
        price: product ? product.price : '',
        company: product ? product.company : '',
        description: product ? product.description : '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (product) {
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
                route('products.update', [product.id]), 
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
            <h2 className='text-lg font-medium'>Product</h2>
            <p className='text-muted-foreground'>Create product form</p>

            <form onSubmit={handleSubmit} className='w-full mt-5 space-y-5 max-w-2xl'>
                <div className='w-full'>
                    <Label>Name</Label>
                    {/* <input 
                        name='name' value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'/> */}
                        <Input name='name' value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className='text-red-500'>{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select required value={data.category_id} onValueChange={(e) => setData('category_id', e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    {categories.map((category) => (
                                        <SelectItem value={category.id}>{category.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                        {errors.category_id && <p className="mt-2 text-red-500">{errors.category_id}</p>}
                </div>
                
                <div className='w-full space-y-2'>
                    <Label>Price</Label>
                    <Input value={data.price} onChange={e => setData('price', e.target.value)} name='price' required />
                    {errors.price && <p className="mt-2 text-red-500">{errors.price}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Company</Label>
                    <Input value={data.company} onChange={e => setData('company', e.target.value)} name='company' required />
                    {errors.company && <p className="mt-2 text-red-500">{errors.company}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Description</Label>
                    <Textarea value={data.description} onChange={e => setData('description', e.target.value)} />
                    {errors.description && <p className="mt-2 text-red-500">{errors.description}</p>}
                </div>

                <div className='space-y-2'>
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

                    {product?.image && !data.image && (
                        <div className='flex items-center gap-5 rounded-lg border p-3'>
                            <img 
                                className='aspect-square w-20 object-cover rounded' 
                                src={`http://127.0.0.1:8000/storage/${product.image}`} 
                                alt="" 
                            />      
                            <p>{product.image.replace('product/', '')}</p>
                        </div>
                        
                    )}    

                    {errors.image && <p className='text-red-500'>{errors.image}</p>}
                    </div>
                <Button disabled={processing}>Submit</Button>
            </form>
        </div>

    </DashboardLayout>
  )
}
