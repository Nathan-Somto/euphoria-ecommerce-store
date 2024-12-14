import React from 'react'
import DashboardHeader from '../components/dashboard-header'
import AddressForm from '../../components/address-form'

export default function AddressPage() {
    return (
        <div className='min-h-screen px-6 pt-6'>
            <DashboardHeader
                title='My Info'
                subTitle='Add Address'
                showBackBtn
            />
            <div className='my-3' />
            <AddressForm
            />
        </div>
    )
}
