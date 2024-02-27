import { CreditCardIcon, DollarSignIcon, LucideIcon, Users, Package } from "lucide-react";

const data:({title:string, Icon: LucideIcon, format: boolean})[] = [{
    title: "Total Revenue",
    Icon: DollarSignIcon,
    format: true
},
{
    title: "Total Sales",
    Icon: CreditCardIcon,
    format: true
},
{
    title :"Active Users",
    Icon: Users,
    format:false
},
{
    title: "Products in Stock",
    format: false,
    Icon: Package
}
]
export default data;