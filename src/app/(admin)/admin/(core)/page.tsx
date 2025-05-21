import kpiData from "./components/kpi-card/data";
import KpiCard from "./components/kpi-card";
import { v4 as uuidv4 } from "uuid";
import RevenueChart from "./components/revenue-chart";
import ProductChart from "./components/product-chart";
import { unstable_cache as cache } from "next/cache";
import {
  getRevenueData,
  getProductPurchaseData,
  getActiveUsers,
  getProductsInStock,
  getRevenueChartData,
  getOrdersAndRevenue
} from "@/actions/adminDashboard.actions";
const adminData = cache(() => {
  return Promise.all([
    getRevenueData(),
    getProductPurchaseData(),
    getActiveUsers(),
    getProductsInStock(),
  ]);
}, ['adminData'], { revalidate: false });
export default async function AdminDashboardPage() {
  const [revenueData, purchaseData, activeUsers, productsInStock] = await adminData();
  const { totalOrders, totalRevenue } = getOrdersAndRevenue(revenueData?.data ?? []);
  const contents = [
    totalRevenue,
    totalOrders,
    activeUsers?.data ?? 0,
    productsInStock?.data ?? 0
  ];
  const refinedData = kpiData.map((item, i) => ({
    ...item,
    content: contents[i],
  }));
  const revenueChartData = getRevenueChartData(revenueData?.data ?? []);
  const productData = purchaseData?.data ?? [];
  return (
    <div className="py-8">
      <div className="grid gap-2 mb-20 sm:grid-cols-2  xl:grid-cols-4">
        {refinedData.map((item) => (
          <KpiCard {...item} key={uuidv4()} />
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Revenue Chart</h2>
      <RevenueChart chartData={revenueChartData} />
      <h2 className="text-2xl font-semibold mb-4">Product  Purhcase Chart</h2>
      <ProductChart chartData={productData} />
    </div>
  );
}
