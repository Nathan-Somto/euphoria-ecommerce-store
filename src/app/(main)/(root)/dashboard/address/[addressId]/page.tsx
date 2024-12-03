import React from 'react'
import DashboardHeader from '../../components/dashboard-header'
import AddressForm from '../../../components/address-form'
import { redirect, RedirectType } from 'next/navigation';
import { getAddress } from '@/actions/address.actions';

export default async function EditAddressPage({ params: {
    addressId
} }: { params: { addressId: string } }) {
    const { data, message } = await getAddress(addressId)
    if (!data || message !== undefined) {
        console.log("not found");
        redirect('/404', RedirectType.replace);
    };
    return (
        <div className='min-h-screen px-6 pt-6'>
            <DashboardHeader
                title='My Info'
                subTitle='Edit Address'
            />
            <div className='my-3' />
            <AddressForm
                initialData={data}
            />
        </div>
    )
}
