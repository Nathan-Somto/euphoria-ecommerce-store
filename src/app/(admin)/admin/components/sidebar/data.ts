import { LayoutDashboard, LucideShoppingCart, Users,Cuboid, PlusCircleIcon, List, LucideIcon } from "lucide-react";
type SidebarData = (string | { text: string, href: string, icon: LucideIcon })[];
const data: SidebarData = [
    "Main Menu",
    {
        text: "dashboard", 
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        text: "categories",
        href: "/categories",
        icon:List
    },
    {
        text: "orders",
        href: "/orders",
        icon: LucideShoppingCart
    },
    {
        text:"customers",
        href: "/customers",
        icon: Users
    },
    "Products",
    {
        text: "products",
        href: "/products",
        icon: Cuboid
    },
    {
        text: "add product",
        href:"/products/create-product",
        icon:PlusCircleIcon
    },
   
]
export default data;