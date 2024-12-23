import { tryCatchFn } from "@/utils/tryCatchFn";
import prisma from "@/lib/prisma";
import { getCategories } from "./categories.actions";
import { unstable_cache as cache } from "next/cache";
const getHomeData = async () => await tryCatchFn({
    cb: async () => {
        const banner = await prisma.banner.findMany();
        const testimonials = await prisma.testimonial.findMany();
        const { data } = await getCategories(true);
        return {
            banner,
            testimonials,
            categories: data
        }
    },
    message: 'Error fetching home data'
});
export const cachedHomeData = cache(async () => await getHomeData(), ['home'], {
    revalidate: false,
    tags: ['home']
});