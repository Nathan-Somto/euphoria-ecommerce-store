import { currentSession } from '@/lib/next-auth'
import React from 'react'
import DashboardHeader from './components/dashboard-header';
import ContactInfo from './components/contact-info';
import AddressSection from './components/address-section';
import AddressCard from './components/address-section/address-card';
import { getAddresses } from '@/actions/address.actions';


export default async function DashboardPage() {
    const session = await currentSession();
    const { data: addresses } = await getAddresses()
    return (
        <div className='min-h-screen px-6 pt-6'>
            <DashboardHeader
                title="My Info"
                subTitle='Contact Information'
            />
            <ContactInfo
                userId={session?.user?.id ?? 'no id'}
                fields={[
                    {
                        label: 'name',
                        type: 'text',
                        value: session?.user?.name ?? ''
                    },
                    {
                        label: 'email',
                        type: 'email',
                        value: session?.user?.email ?? ''
                    },
                    {
                        label: 'username',
                        type: 'text',
                        value: session?.user?.username ?? ''
                    }
                ]}
            />
            <AddressSection>
                {
                    addresses?.length === 0 || addresses === undefined ?
                        <div>
                            <p className='text-neutral-foreground text-lg'>
                                You have no addresses saved
                            </p>
                        </div> :
                        addresses.map((item, index) => (
                            <AddressCard key={item.id} data={{ ...item, index }} />
                        ))
                }
            </AddressSection>
        </div>
    )
}
