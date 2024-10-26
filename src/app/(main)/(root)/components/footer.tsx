'use client';
import { LucideFacebook, LucideLinkedin, InstagramIcon, TwitterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FooterDownloadBtn from './footer-downloadbtn';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const footerData = [
    {
        heading: 'Need Help',
        links: ['Contact Us', 'Track Order', 'Returns & Refunds', "FAQ's", 'Career']
    },
    {
        heading: 'Company',
        links: ['About Us', 'Euphoria Blog', 'Collaboration', 'Media']
    },
    {
        heading: 'More Info',
        links: ['Terms and Conditions', 'Privacy Policy', 'Shipping Policy', 'Sitemap']
    },
    {
        heading: 'Location',
        links: [
            'support@euphoria.in',
            'Admiralty Way, Lekki Phase 2, Lagos, Nigeria',
            'euphoriastan',
            'Plot 15, Lekki-Epe Expressway, Lekki Phase 2, Lagos, Nigeria'
        ]
    }
];
const socialLinks = [
    {
        Icon: LucideFacebook,
        link: 'https://facebook.com/euphoria'
    },
    {
        Icon: LucideLinkedin,
        link: 'https://linkedin.com/euphoria'
    },
    {
        Icon: InstagramIcon,
        link: 'https://instagram.com/euphoria'
    },
    {
        Icon: TwitterIcon,
        link: 'https://x.com/euphoria'
    }
];
const downloadLinks = [
    {
        subTxt: 'Download on the',
        store: 'App Store',
        image: '/footer/appstore.svg',
        alt: 'App Store logo',
        link: '/app-store'
    },
    {
        subTxt: 'Available on',
        store: 'Google Play',
        image: '/footer/playstore.svg',
        alt: 'Google Play logo',
        link: '/google-play'
    }
];

export default function Footer() {
    const [restartView, setRestartView] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setRestartView((prev) => !prev);
    }, [pathname]);

    return (
        <motion.footer
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            key={restartView ? 'restart' : 'no-restart'}
            className="bg-[#3C4242] text-white py-10 px-12"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {footerData.map((section, index) => (
                    <div key={index}>
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: (0.1 * index) + 0.85, duration: 0.3 }}
                            viewport={{ once: true }}
                            className="font-bold text-white mb-4 text-xl"
                        >
                            {section.heading}
                        </motion.h3>
                        <ul>
                            {section.links.map((link, linkIndex) => (
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: (0.07 * linkIndex) + 0.85, duration: 0.3 }}
                                    viewport={{ once: true }}
                                    key={linkIndex}
                                    className="text-white/70 mb-2 cursor-pointer hover:opacity-50"
                                >
                                    {link}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-6xl mx-auto mt-3 mb-5 space-y-4 md:space-y-0 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                >
                    {socialLinks.map((Social, index) => (
                        <a key={index} href={Social.link} className="text-[#3C4242] flex items-center justify-center hover:opacity-50 size-8 bg-white p-2 rounded-md hover:scale-110">
                            <Social.Icon className="size-6" />
                        </a>
                    ))}
                </motion.div>
                <div className="col-span-2 hidden lg:block"></div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-bold text-white mb-4 text-xl text-left">Download The App</h3>
                    <div className="flex items-center gap-x-3">
                        {downloadLinks.map((download, index) => (
                            <FooterDownloadBtn key={index} {...download} />
                        ))}
                    </div>
                </motion.div>
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-white/70 text-left"
            >
                © {new Date().getFullYear()} Euphoria. All rights reserved.
            </motion.p>
        </motion.footer>
    );
}
