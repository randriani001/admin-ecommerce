"use client"

import { Category, Product, ProductVariant } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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

export const columns: ColumnDef<ProductVariant>[] = [
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const variant = row.original;

      return <img
        src={`http://127.0.0.1:8000/storage/${variant.image}`} 
        alt={variant.variant_name}
        className="aspect-square w-[100px] object-contain" />
    }
  },
  {
    accessorKey: "variant_name",
    header: "Variant Name"
  },
  {
    accessorKey: "stock",
    header: "Stock"
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
      const variant = row.original
      
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
                  router.visit(`/dashboard/products/${variant.product_id}/variants/${variant.id}`, {
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
              <Link href={`/dashboard/products/${variant.product_id}/variants/${variant.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
