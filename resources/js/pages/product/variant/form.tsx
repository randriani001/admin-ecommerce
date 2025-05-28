import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product, ProductVariant } from '@/types';
import { router, useForm } from '@inertiajs/react'
import React from 'react'
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

interface Props {
    product: Product;
    variant?: ProductVariant
}

export default function ProductVariantForm({ product, variant }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        variant_name: string;
        product_id: string;
        stock: string;
        image: File | null;
    }>({
        variant_name: variant ? variant.variant_name : '',
        image: null,
        product_id: product.id,
        stock: variant ? variant.stock : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (variant) {
            router.post(
                // `/dashboard/products/${product.id}/variants/${variant.id}`, 
                route('products.variants.update', [product.id, variant.id]),
                {
                    ...data,
                    _method: "put", 
                }, 
                {
                    preserveScroll: true,
                },
            ); 
        } else {
            post(route('products.variants.store', [product.id]), {
                preserveScroll: true,
            });
        };
    }

    return (
        <DashboardLayout>
            <div className="p-10">
                <h2 className='text-lg font-medium'>Variant</h2>
                <p className='text-muted-foreground text-sm'>Create variant form for {product.name}</p>

                 <form onSubmit={handleSubmit} className='w-full mt-5 space-y-5 max-w-2xl'>
                <div className='w-full'>
                    <Label>Variant Name</Label>
                    {/* <input 
                        name='name' value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'/> */}
                        <Input name='name' value={data.variant_name} onChange={e => setData('variant_name', e.target.value)} />
                    {errors.variant_name&& <p className='text-red-500'>{errors.variant_name}</p>}
                </div>

                <div className='w-full space-y-2'>
                    <Label>Stock</Label>
                    <Input value={data.stock} onChange={e => setData('stock', e.target.value)} name='price' required />
                    {errors.stock && <p className="mt-2 text-red-500">{errors.stock}</p>}
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

                    {variant?.image && !data.image && (
                        <div className='flex items-center gap-5 rounded-lg border p-3'>
                            <img 
                                className='aspect-square w-20 object-cover rounded' 
                                src={`http://127.0.0.1:8000/storage/${variant.image}`} 
                                alt="" 
                            />      
                            <p>{variant.image.replace('product/', '')}</p>
                        </div>
                    )}    

                    {errors.image && <p className='text-red-500'>{errors.image}</p>}
                    </div>
                <Button disabled={processing}>Submit</Button>
            </form>
            </div>
        </DashboardLayout>
    );
}
