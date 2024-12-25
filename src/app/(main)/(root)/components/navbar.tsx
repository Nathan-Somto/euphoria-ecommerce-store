'use client';
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCart, User2Icon, UserCog2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion"
import CurrencyConverter from "./currency-converter";
import CategoryDropdown from "./category-dropdown";
import NotificationBadge from "@/components/notification-badge";
import { CategoryWithProducts } from "@/actions/categories.actions";
import { Session } from "next-auth";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
interface NavItem {
    title: string
    href: string
    redirect?: boolean
}
const mobileNavItems = (profileId: string | null, isAdmin: boolean): NavItem[] => {
    const baseArray = [
        {
            title: 'Shop',
            href: '/'
        }];
    const customerArray = [{
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
    const adminArray = [
        {
            title: "Admin",
            href: '/admin',
            redirect: !isAdmin
        }
    ]
    return [...baseArray, ...(isAdmin ? adminArray : customerArray)]
}
type NavbarProps = {
    session: Session | null
    categories: CategoryWithProducts[]
}
export default function Navbar({ session, categories }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const cart = useCart(state => state.cart);
    const getTotalWishlistItems = useWishlist(state => state.getTotalWishlistProducts)
    const searchParams = useSearchParams();
    React.useEffect(() => {
        const search = searchParams.get('search');
        if (search) {
            setSearchValue(search)
        }
    }, [
        searchParams.get('search')
    ]);
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
    const isLoggedIn = session?.user !== undefined;
    const isAdmin = session?.user?.role === 'ADMIN';
    const navItems = mobileNavItems(session?.user?.id ?? null, isAdmin);
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
                        <CategoryDropdown categories={categories} />
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
                        className="relative data-[active=true]:text-primary data-[active=true]:!border-primary data-[active=true]:!border-solid data-[active=true]:!border-2"
                        data-active={'/cart' === pathname}
                        onClick={() => router.push('/cart')}
                    >
                        <ShoppingCart aria-labelledby="cart">
                            <title id="cart">cart</title>
                        </ShoppingCart>
                        {cart.length > 0 && (<NotificationBadge value={cart.length} size={20} />)}
                    </Button>
                    {(isLoggedIn && !isAdmin) && (
                        <>
                            <Button
                                variant={'neutral'}
                                size='icon'
                                className="hidden relative lg:flex data-[active=true]:text-primary data-[active=true]:!border-primary data-[active=true]:!border-solid data-[active=true]:!border-2"
                                data-active={'/favourites' === pathname}
                                onClick={() => router.push(isLoggedIn ? '/dashboard/wishlist' : '/auth/login')}
                            >
                                <HeartIcon aria-labelledby="favourites"  >
                                    <title id="favourites">favourites</title>
                                </HeartIcon>
                                {getTotalWishlistItems() > 0 && (<NotificationBadge value={getTotalWishlistItems()} size={20} />)}
                            </Button>
                            <Button
                                variant={'neutral'}
                                size='icon'
                                className="hidden lg:flex data-[active=true]:text-primary data-[active=true]:!border-primary data-[active=true]:!border-solid data-[active=true]:!border-2"
                                data-active={'/dashboard' === pathname}
                                onClick={() => router.push(isLoggedIn ? '/dashboard' : '/auth/login')}
                            >
                                {/* Not using next image because of oauth providers */}
                                {session?.user?.profilePhoto ? (
                                    <img src={session?.user?.profilePhoto} alt="user avatar" className="rounded-full w-8 h-8" />
                                ) : (
                                    <User2Icon aria-labelledby="account">
                                        <title id="account">account</title>
                                    </User2Icon>
                                )}
                            </Button>
                        </>
                    )}
                    {
                        isLoggedIn && isAdmin && (
                            <Button
                                variant={'neutral'}
                                size='icon'
                                className="hidden lg:flex"
                                asChild
                            >
                                <Link href="/admin">
                                    <UserCog2Icon aria-labelledby="admin">
                                        <title id="admin">admin</title>
                                    </UserCog2Icon>
                                </Link>
                            </Button>
                        )
                    }
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
                {!isLoggedIn && (
                    <div className="hidden lg:flex gap-x-2">
                        <Button className="min-w-[140px]" onClick={() => router.push('/auth/login')}>Login</Button>
                        <Button variant={'outline'} className="text-primary min-w-[140px]" onClick={() => router.push('/auth/register')}>Sign Up</Button>
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
                                <CategoryDropdown categories={categories} />
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}