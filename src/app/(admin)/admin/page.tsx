import kpiData from "./components/kpi-card/data";
import KpiCard from "./components/kpi-card";
import { v4 as uuidv4 } from "uuid";
import RevenueChart from "./components/revenue-chart";
import ProductChart from "./components/product-chart";
const data = [
  {
    name: "January",
    total: 23000,
  },
  {
    name: "Feburary",
    total: 35000,
  },
  {
    name: "March",
    total: 12500,
  },
  {
    name: "April",
    total: 1200,
  },
  {
    name: "June",
    total: 13000
  },
  {
    name: "July",
    total: 123499
  },
  {
    name: "August",
    total: 53000
  },
  {
    name: "September",
    total: 65720
  },
  {
    name: "October",
    total: 75200
  },
  {
    name: "November",
    total: 82350
  },
  {
    name: "December",
    total: 34250
  }
];
const productData = [{
  name: "White Shirt",
  total: 15
}, {
  name: "Flashy Hats",
  total:10
}, {
  name :"Sexy Hoodie",
  total: 4
},
{
  name: "Manly Sneakers",
  total:12
}
]
export default function AdminDashboardPage() {
  const contents = [125000000, 34, 41, 5];
  const refinedData = kpiData.map((item, i) => ({
    ...item,
    content: contents[i],
  }));
  return (
    <div className="h-full py-8">
      <div className="grid gap-2 mb-20 sm:grid-cols-2  xl:grid-cols-4">
        {refinedData.map((item) => (
          <KpiCard {...item} key={uuidv4()} />
        ))}
      </div>
      <RevenueChart chartData={data} />
      <ProductChart chartData={productData}/>
    </div>
  );
}
