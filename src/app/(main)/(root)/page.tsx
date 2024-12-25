import Banner from "./components/home/banner";
import CategoryRow from './components/category-row';
import WhyUs from "./components/home/whyUs";
import Brands from "./components/home/brands";
import Testimonials from "./components/home/testimonials";
import SearchResultsScreen from "./components/home/search-results";
import { ProductRow } from "./components/product/product-row";
import { getCachedProducts } from "@/actions/products.actions";
import Articles from "./components/home/articles";
import { cachedHomeData } from "@/actions/home.actions";
export default async function Home() {
  const { data: products } = await getCachedProducts();
  const { data: homeData } = await cachedHomeData();
  const normalizedCategories = homeData?.categories?.map(({ products, createdAt, ...category }) => ({
    ...category,
    totalProducts: products.length,
    image: category.image ?? 'https://via.placeholder.com/150',
  }));
  return (
    <div className="min-h-screen relative">
      <SearchResultsScreen products={products ?? []} />
      <Banner data={homeData?.banner ?? []} />
      <CategoryRow
        data={normalizedCategories ?? []}
      />
      <ProductRow headingFilter="Featured" data={products ?? []} />
      <Articles />
      <WhyUs />
      <ProductRow headingFilter="men's clothing" data={products ?? []} />
      <ProductRow headingFilter="women's clothing" data={products ?? []} />
      <Brands />
      <Testimonials
        data={homeData?.testimonials ?? []}
      />
    </div>
  )
}
