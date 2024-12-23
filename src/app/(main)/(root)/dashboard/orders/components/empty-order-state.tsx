import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TruckIcon } from 'lucide-react';
import { $Enums } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
    status: $Enums.Status | 'ALL';
}

const EmptyOrderState: React.FC<Props> = ({ status }) => {
    // Determine the icon and message based on the status
    const renderContent = () => {
        switch (status) {
            case 'DELIVERED':
                return {
                    icon: <TruckIcon className="size-10 text-emerald-400" />,
                    message: 'Make more orders to fill up your delivered orders list.',
                    backgroundColor: ' #d1fae5'
                };
            case 'FAILED':
                return {
                    icon: <AlertTriangle className="size-10 text-rose-400" />,
                    message: 'No worrisome failed orders to show!',
                    backgroundColor: '#ffe4e6'
                };
            case 'PAID':
                return {
                    icon: <CheckCircle className="size-10 text-green-400" />,
                    message: 'Keep shopping! to fill up your paid orders list.',
                    backgroundColor: '#F0F9F4'
                };
            case 'ALL':
            default:
                return {
                    icon: <Clock className="size-10 text-gray-400" />,
                    message: 'Start shopping to see your orders here.',
                    backgroundColor: '#f3f4f6 '
                };
        }
    };

    const { icon, message, backgroundColor } = renderContent();

    return (
        <div className="flex flex-col items-center justify-center h-[280px] p-4 text-center  rounded-lg shadow-md">
            <div
                style={{ backgroundColor }}
                className="size-20 hover:scale-110 hover:-translate-y-1 p-2 mb-3 mx-auto   rounded-full flex items-center justify-center"
            >
                {icon}
            </div>
            <h3 className="font-semibold mb-0.5 text-lite-foreground capitalize">
                {status === 'ALL' ? 'No Orders' : `No ${status.toLowerCase()} Orders`}
            </h3>
            <p className="text-neutral-foreground mx-auto w-[80%] text-sm mb-4">{message}</p>
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
    );
};

export default EmptyOrderState;
