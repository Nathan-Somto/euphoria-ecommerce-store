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
    const isRoute = (href: string) => {
        if (href === '/dashboard' && pathname.includes('address')) return true
        if (href === '/dashboard/orders' && pathname.match(/^\/dashboard\/orders\//)) return true
        return href === pathname;
    }
    const lastDynamicLink = items.find(item => isRoute(item.href));
    const dynamicLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: 'My Account',
            href: pathname.includes('address') ? pathname : '/dashboard'
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
        <div
            className={cn('top-20  lg:sticky  fixed block left-0 z-[50] h-0  border-r-neutral-300 border-r w-0', isOpen && 'h-[calc(100vh-20*0.25rem)] w-[250px] overflow-hidden')}>
            <div
                className={cn('absolute top-0 left-0 right-0  z-[30] lg:hidden h-full w-10  bg-background', isOpen && 'left-[200px] h-20 bg-transparent')}
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
                        animate={{
                            opacity: isOpen ? 1 : 0, transition: {
                                duration: 0.3,
                                delay: 0.5,
                                ease: "easeIn"
                            }
                        }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        exit={{ opacity: 0 }}
                        className={cn('fixed top-20 left-[250px] h-[calc(100vh-20*0.25rem)] w-[calc(100%-250px)] bg-black z-[10] bg-opacity-50 lg:!hidden', !isOpen && 'hidden')}
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
                            transition={{ duration: 0.65, ease: [0.21, 0.43, 0.012, 0.122] }}
                            className={cn('w-[250px] pt-6 pl-1.5 z-[30] h-full bg-background', !isOpen && 'hidden')}>
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
                                        <Button asChild variant={isRoute(item.href) ? 'lite' : 'ghost'} className='w-full flex justify-start gap-x-2'>
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

        </div>
    )
}
