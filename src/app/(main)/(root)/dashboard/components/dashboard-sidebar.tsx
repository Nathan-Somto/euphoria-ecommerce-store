'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import SectionHeading from '../../components/section-heading'
import { HeartIcon, InfoIcon, PanelLeftCloseIcon, PanelLeftIcon, ShoppingBagIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Signout from './signout'
import LinkHistory from '../../components/link-history'
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
type Props = {
    username: string,
}
const items = [
    {
        label: 'My Info',
        icon: UserIcon,
        href: '/dashboard'
    },
    {
        label: "My Orders",
        icon: ShoppingBagIcon,
        href: '/dashboard/orders'
    },
    {
        label: 'Wishlist',
        icon: HeartIcon,
        href: '/dashboard/wishlist'
    }
] as const;
export default function DashboardSidebar({ username }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isMobile } = useMediaQuery({
        mobileBreakpoint: 1023
    });
    const pathname = usePathname();
    const lastDynamicLink = items.find(item => item.href === pathname);
    const dynamicLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: 'My Account',
            href: '/dashboard'
        }
    ];
    if (lastDynamicLink && lastDynamicLink.label !== 'My Info') {
        dynamicLinks.push({
            label: lastDynamicLink.label,
            href: lastDynamicLink.href
        });
    }
    // when it is tablet size respect the isOpen state when not default open
    React.useEffect(() => {
        if (!isMobile) {
            setIsOpen(true);
        }
        else if (isMobile && isOpen) {
            setIsOpen(false);
        }
    }, [isMobile]);
    console.log("isMobile", isMobile);
    return (
        <>
            <div
                className={cn('absolute top-20 left-0 right-0  z-[30] lg:hidden h-full w-10 border-r-neutral-300 border-r bg-background', isOpen && 'left-[250px] h-20 bg-transparent border-r-0 border-r-transparent')}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant={'ghost'}
                    size='icon'
                    className='hover:bg-transparent hover:text-primary-foreground'>
                    {!isOpen ? <PanelLeftIcon /> : <PanelLeftCloseIcon />}
                    <span className='sr-only'>
                        {isOpen ? 'Close' : 'Open'} Sidebar
                    </span>
                </Button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="dashboard-sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0 }}
                        className={cn('fixed inset-0 bg-black z-[10] bg-opacity-50 lg:!hidden', !isOpen && 'hidden')}
                        onClick={() => setIsOpen(false)}
                    />
                )}
                {
                    isOpen && (
                        <motion.aside
                            key="dashboard-sidebar"
                            initial={!isMobile ? undefined : { x: -250 }}
                            animate={!isMobile ? undefined : { x: isOpen ? 0 : -250 }}
                            exit={{ x: -250 }}
                            transition={{ duration: 0.3 }}
                            className={cn('sticky top-20 pt-6 w-[250px] bg-background z-[30] min-h-screen pl-1.5', !isOpen && 'hidden')}>
                            <div className='lg:block hidden lg:mb-7'>
                                <LinkHistory
                                    links={dynamicLinks}
                                    currentRoute={pathname ?? ''}
                                    className="text-sm"
                                    iconClassName='size-3'
                                />
                            </div>
                            <div className='mb-6 '>
                                <SectionHeading title={`Hello ${username}`} className='lg:text-3xl' />
                                <p className='text-neutral-foreground text-sm mt-2.5'>Welcome to your account</p>
                            </div>
                            <ul className='space-y-3'>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        <Button asChild variant={pathname === item.href ? 'lite' : 'ghost'} className='w-full flex justify-start gap-x-2'>
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                                <li><Signout /></li>
                            </ul>
                        </motion.aside>
                    )
                }
            </AnimatePresence>

        </>
    )
}
