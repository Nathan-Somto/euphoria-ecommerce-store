import { Button } from '@/components/ui/button';
import React from 'react'
import ProductComments from './product-comments';
import ProductRating from './product-rating';
import SectionHeading from '../../components/section-heading';
import { cn } from '@/lib/utils';
type Props = {
    description: string
}
type Tabs = 'Description' | 'Comments' | 'Rating';
const tabs: Tabs[] = [
    'Description',
    'Comments',
    'Rating'
] as const
function ProductInfoTabs({ description }: Props) {
    const [activeTab, setActiveTab] = React.useState<Tabs>('Description')
    return (
        <div>
            <SectionHeading title={`Product ${activeTab}`} />
            <div className='flex items-center justify-start  my-6 gap-x-12'>
                {tabs.map(item =>
                    <Button
                        key={item}
                        onClick={() => setActiveTab(item)}
                        className={cn('p-0', { 'underline': activeTab === item, 'text-[#3C4242]': activeTab !== item })}
                        variant={activeTab === item ? 'link' : 'ghost'}>
                        {item}
                    </Button>)}
            </div>
            <div>
                {
                    activeTab === 'Description' && (
                        <div>
                            <p className="text-[#807D7E] font-light leading-[25px] tracking-[2%]">{description}</p>
                        </div>
                    )
                }
                {
                    activeTab === 'Comments' && (
                        <ProductComments />
                    )
                }
                {
                    activeTab === 'Rating' && (
                        <ProductRating />
                    )
                }
            </div>

        </div>
    )
}

export default ProductInfoTabs