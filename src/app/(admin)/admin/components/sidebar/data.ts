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
        href: "/admin/categories",
        icon:List
    },
    {
        text: "orders",
        href: "/admin/orders",
        icon: LucideShoppingCart
    },
    {
        text:"customers",
        href: "/admin/customers",
        icon: Users
    },
    "Products",
    {
        text: "products",
        href: "/admin/products",
        icon: Cuboid
    },
    {
        text: "add product",
        href:"/admin/products/new",
        icon:PlusCircleIcon
    },
   
]
export default data;