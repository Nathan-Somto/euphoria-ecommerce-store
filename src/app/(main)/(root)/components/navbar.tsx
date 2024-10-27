'use client';
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import {HeartIcon, ShoppingCart, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion"
import CurrencyConverter from "./currency-converter";
import CategoryDropdown from "./category-dropdown";
import NotificationBadge from "@/components/notification-badge";
const mobileNavItems = (profileId: string | null) => [
    {
        title: 'Shop',
        href: '/'
    },
    {
        title: "WishList",
        href: '/dashboard/wishlist',
        redirect: profileId === null
    },
    {
        title: "Account",
        href: `/dashboard`,
        redirect: profileId === null
    },
]
export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const handleChange = (value: string) => {
        setSearchValue(value);
        if (pathname === '/') {
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('search')) {
                searchParams.set('search', value);
            } else {

                searchParams.append('search', value);
            }


            router.push('/?' + searchParams.toString());
        } else {

            router.push('/?search=' + value);
        }
    };
    const toggleMobileNav = (val: boolean) => {
        document.querySelector('body')?.classList.toggle('overflow-hidden')
        setMobileNavOpen(val)
    }
    const isAuth = pathname.includes('auth');
    const isLoggedIn = isAuth ? pathname.includes('login') : false;
    const navItems = mobileNavItems(null)
    return (
        <>
            <nav className="flex items-center border-b-[1.5px] border-b-disabled h-20 z-[900000] py-6 w-full px-3 sm:px-7 justify-between fixed top-0 bg-white lg:w-full  inset-x-0">
                <Link href='/'>
                    <Image src={'/Logo.svg'} alt="euphoria logo" className="w-[50px] h-[40px] sm:w-[90px] sm:h-[45px] object-contain" height={45} width={90} />
                </Link>
                <div className="flex flex-[0.8] justify-between items-center">
                    <div className="hidden items-center gap-x-4 lg:flex">
                        <Link href="/">Shop</Link>
                        <CurrencyConverter />
                        <CategoryDropdown />
                    </div>
                    <div className="lg:flex-[0.8] flex-[0.9]">
                        <SearchBar
                            useDebounce={false}
                            onChange={handleChange}
                            value={searchValue}
                            placeholder="Search"
                            containerClassName=" border-none !text-disabled-foreground bg-disabled"
                            inputClassName="placeholder:text-disabled-foreground"
                        />
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <Button
                        variant={'neutral'}
                        size='icon'
                        className="hidden lg:flex data-[active=true]:text-primary"
                        data-active={'/favourites' === pathname}
                        onClick={() => router.push(isLoggedIn ? '/dashboard/wishlist' : '/auth/login')}
                    >
                        <HeartIcon aria-labelledby="favourites"  >
                            <title id="favourites">favourites</title>
                        </HeartIcon>
                    </Button>
                    <Button
                        variant={'neutral'}
                        size='icon'
                        className="hidden lg:flex data-[active=true]:text-primary"
                        data-active={'/dashboard' === pathname}
                        onClick={() => router.push(isLoggedIn ? '/dashboard' : '/auth/login')}
                    >
                        <User2Icon aria-labelledby="account">
                            <title id="account">account</title>
                        </User2Icon>
                    </Button>
                    <Button
                        variant={'neutral'}
                        size='icon'
                        className="relative data-[active=true]:text-primary"
                        data-active={'/cart' === pathname}
                        onClick={() => router.push(isLoggedIn ? '/cart' : '/auth/login')}
                    >
                        <ShoppingCart aria-labelledby="cart">
                            <title id="cart">cart</title>
                        </ShoppingCart>
                        <NotificationBadge value={5} size={20} />
                    </Button>
                    <motion.div
                        whileTap={{ scale: 0.85 }}
                        className="lg:hidden flex flex-col justify-center cursor-pointer sm:ml-4 ml-1.5"
                        onClick={() => toggleMobileNav(!mobileNavOpen)}
                    >
                        <motion.div
                            animate={mobileNavOpen ? { rotateZ: 45, y: 5, transition: { duration: 0.2 } } : {}}
                            className="h-[2px] w-6 bg-black/70 mb-1"
                        ></motion.div>
                        <motion.div
                            animate={mobileNavOpen ? { opacity: 0, transition: { duration: 0.1 } } : { opacity: 1, transition: { delay: 0.3 } }}
                            className="h-[2px] w-6 bg-black/70 mb-1"
                        ></motion.div>
                        <motion.div
                            animate={mobileNavOpen ? { rotateZ: -45, y: -6, transition: { duration: 0.2 } } : {}}
                            className="h-[2px] w-6 bg-black/70"
                        ></motion.div>
                    </motion.div>
                </div>
                {isAuth || isLoggedIn && (

                    <div>
                        <Button>Login</Button>
                        <Button variant={'outline'} className="text-primary">Sign Up</Button>
                    </div>
                )}
            </nav>
            <AnimatePresence>
                {
                    mobileNavOpen && (
                        <motion.div
                            initial={{
                                opacity: 0.5,
                                height: 0,
                                paddingBottom: 0
                            }}
                            animate={{
                                opacity: 1,
                                height: '100vh',
                                paddingBottom: 28
                            }}
                            transition={{
                                duration: 0.35
                            }}
                            exit={{
                                opacity: 0.5,
                                height: 0,
                                paddingBottom: 0,
                                transition: {
                                    delay: 0.65,
                                    duration: 0.3
                                }

                            }}
                            className="top-20 lg:hidden flex flex-col py-7 px-6 space-y-3.5 text-[28px] fixed w-full h-screen overflow-auto bg-white z-[9000000]">
                            {
                                navItems.map((item, index) => (
                                    <motion.div key={item.title} initial={{
                                        y: 45,
                                        opacity: 0
                                    }}
                                        transition={{
                                            duration: 0.35,
                                            delay: (0.09 * index) + 0.35,
                                            ease: "easeIn"
                                        }}
                                        animate={{
                                            y: 0,
                                            opacity: 1
                                        }}
                                        exit={{
                                            y: -45,
                                            opacity: 0,
                                            transition: {
                                                duration: 0.3,
                                                delay: (0.12 * index),
                                            }
                                        }}
                                    >

                                        <Link
                                            href={item?.redirect ? '/auth/login' : item.href}
                                            onClick={() => toggleMobileNav(false)}
                                            data-active={item.href === pathname}
                                            className="hover:opacity-50 data-[active=true]:text-primary"
                                        >
                                            {item.title}
                                        </Link>
                                    </motion.div>
                                ))
                            }
                            <motion.div 
                            initial={{
                                y: 45,
                                opacity: 0
                            }}
                                transition={{
                                    duration: 0.35,
                                    delay: (0.09 * navItems.length) + 0.35,
                                    ease: "easeIn"
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1
                                }}
                                exit={{
                                    y: -45,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.3,
                                        delay: (0.12 * navItems.length),
                                    }
                                }}
                            >
                                <CurrencyConverter />
                            </motion.div>
                            <motion.div initial={{
                                y: 45,
                                opacity: 0
                            }}
                                transition={{
                                    duration: 0.35,
                                    delay: (0.09 * (navItems.length + 1)) + 0.35,
                                    ease: "easeIn"
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1
                                }}
                                exit={{
                                    y: -45,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.3,
                                        delay: (0.12 * (navItems.length + 1)),
                                    }
                                }}
                            >
                                <CategoryDropdown />
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}