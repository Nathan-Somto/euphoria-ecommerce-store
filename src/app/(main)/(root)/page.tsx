import Banner from "./components/banner";
import CategoryRow from './components/category-row';
export default function Home() {
  return (
    <div className="min-h-screen">
     <Banner/>
     <CategoryRow 
     data={[
      {
        id: 1,
        name: 'Men\'s Clothing',
        image: '/dummy/category-2.jpg'
      },
      {
        id: 2,
        name: 'Women\'s Clothing',
        image: '/dummy/category-1.jpg'
      }
     ]}/>
    </div>
  )
}
