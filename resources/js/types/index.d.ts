export interface Category {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
    id: string;
    name: string;
    category_id: string;
    description?: string;
    company: string;
    price: string;
    created_at: Date;
    updated_at: Date;
    image: string | null;
}

export interface ProductVariant {
    id: string;
    variant_name: string;
    product_id: string;
    image: string;
    stock: string;
    created_at: Date;
    updated_at: Date;
}

export interface Order {
    
}