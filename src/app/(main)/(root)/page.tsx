import Banner from "./components/home/banner";
import CategoryRow from './components/category-row';
import WhyUs from "./components/home/whyUs";
import Brands from "./components/home/brands";
import Testimonials from "./components/home/testimonials";
import SearchResultsScreen from "./components/home/search-results";
import { ProductRow } from "./components/product/product-row";
import { getCachedProducts } from "@/actions/products.actions";
export default async function Home() {
  //TODO: fetch products from server
  const {data: products} = await getCachedProducts();
  //TODO: fetch banner data from server
  //TODO: fetch categories from server
  //TODO: fetch testimonials from server
  return (
    <div className="min-h-screen relative">
    <SearchResultsScreen products={products ?? []}/>
     <Banner/>
     <CategoryRow 
     data={[
      {
        id: '1',
        name: 'Men\'s Clothing',
        image: '/dummy/category-2.jpg',
        totalProducts: 1
      },
      {
        id: '2',
        name: 'Women\'s Clothing',
        image: '/dummy/category-1.jpg',
        totalProducts: 6
      }
     ]}/>
    <ProductRow headingFilter="New Arrivals" data={products ?? []}/>
     <WhyUs/>
    {/*TODO: replace with dynamic response from categories */}
    <ProductRow headingFilter="men's clothing" data={products ?? []}/>
    <ProductRow headingFilter="women's clothing" data={products ?? []}/>
     <Brands/>
     <Testimonials/>
    </div>
  )
}
