import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function ProductsPage() {
    return (
        <div>
        <div className="flex items-center">
        <Heading
            title="Products Page"
            description="explore the list of all available products"
            />
            <Button asChild variant="link">
                <Link href="/admin/products/new">Add Product</Link>
            </Button>
        </div>
        </div>
    )
}