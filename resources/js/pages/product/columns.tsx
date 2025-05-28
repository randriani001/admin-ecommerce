"use client"

import { Category, Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Swal from 'sweetalert2';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, router } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<
  Product & {
      category: Category;
  }
  >[] = [
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      const imageUrl = product.image 
      ? `http://127.0.0.1:8000/storage/${product.image}` 
      : ''

      return <img
        src={imageUrl} 
        alt={product.name}
        className="aspect-square w-[100px] object-contain" />
    }
  },
  {
    accessorKey: "name",
    //header: "Name"
    header: ({ column }) => {
      return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
  },
  {
    //accessorKey: "category_id",
    id: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const product = row.original;

      return product.category.name;
    }
  },
  {
    accessorKey: "company",
    header: "Perusahaan"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "created_at",
    header: "Created At"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      
      const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                  router.visit(`/dashboard/products/${product.id}`, {
                      method: "delete",
                      onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });
                      },
                      onError: (err) => {
                        Swal.fire({
                            title: "Error!",
                            text: err.message,
                            icon: "error"
                            });
                      }
                  })
              }
        });

       
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild 
              // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
                <Link href={`/dashboard/products/${product.id}/edit`}>
              Edit
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={route('products.variants.index', [product.id])}>View Variants</Link>
                {/* href={`/dashboard/products/${product.id}/variants`} */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
