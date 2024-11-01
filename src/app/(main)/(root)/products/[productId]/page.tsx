import ImageCarousel from "@/components/carousel/image-carousel";

export default function ProductPage() {
    const images = [
        {
            src: '/carousel/banner-1.jpg',
            alt: 'Image 1'
        },
        {
            src: '/carousel/banner-2.png',
            alt: 'Image 2'
        },
        {
            src: '/carousel/banner-3.png',
            alt: 'Image 3'
        }
    ];
    return (
        <div>
            <div className="grid grid-cols-2 min-h-screen">
                {/* Product Image Carousel */}
                <ImageCarousel images={images} imageExitDirection="y" indicatorOrientation="left" />
                {/* Product Info Segment */}
            </div>
            <div>
                {/*Product Tab: Description, Reviews */}
                {/* Product Video Showcase */}
            </div>
            <div>
                {/* Similar Products */}
            </div>
        </div>
    )
}