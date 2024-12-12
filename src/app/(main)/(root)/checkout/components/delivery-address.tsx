import { RadioGroup } from '@radix-ui/react-radio-group';
import React from 'react'
import AddressForm from '../../components/address-form';
import { Button } from '@/components/ui/button';
import { RadioGroupItem } from '@/components/ui/radio-group';
type Props = {
    addresses: Address[];
    selectedAddress: string | null;
    setAddress: (val: Address) => void // updates the parent client component
    disabled?: boolean
}
export default function DeliveryAddress({ addresses, setAddress, selectedAddress, disabled }: Props) {
    const [showForm, setShowForm] = React.useState(false);
    const noAddresses = addresses.length === 0;
    React.useEffect(() => {
        if (addresses.length === 0) {
            setShowForm(true);
        }
    }, [addresses]);
    const AddressesAsRecord = React.useMemo(() => {
        let record: { [id: string]: Address } = {};
        addresses.forEach(item => {
            record[item.id] = item;
        });
        return record
    }, [addresses])
    return (
        <div className='mb-6'>
            <div>
                <div className='flex items-center justify-between mb-5'>
                    <h3 className='opacity-80'>Delivery Address</h3>
                    <Button onClick={() => setShowForm(true)} disabled={disabled}>Create New Address</Button>
                </div>
                {/* If i don't have an address show create address form */}
                {noAddresses && (<p>You don't have an address saved, fill out this form before you proceed with paymenr</p>)}
                {showForm && (<AddressForm
                    disabled={disabled}
                    onSubmitCb={(address) => {
                        setShowForm(false);
                        // no address select as default
                        if (addresses.length === 0) {
                            setAddress(address)
                        }
                    }}
                />)}
                <div>
                    {/* Scrollable horizontal list */}
                    <div
                        className='flex gap-4 items-center overflow-x-auto mt-4 scrollbar-hide'
                    >
                        {
                            selectedAddress && (
                                <RadioGroup
                                    defaultValue={selectedAddress}
                                    value={selectedAddress}
                                    disabled={disabled}
                                    onValueChange={(val) =>
                                        setAddress(AddressesAsRecord[val] ?? null)
                                    }
                                >
                                    {addresses.map((address, index) => (
                                        /* Card like design */
                                        <div key={address.id}
                                            className='bg-lite rounded-xl max-w-72  min-h-8  px-6 py-4'
                                        >
                                            <h3 className='text-sm mb-2'>Address #{index + 1}</h3>
                                            <div className='mb-3 flex'>
                                                <RadioGroupItem
                                                    value={address.id}
                                                    id={address.id}
                                                    className='inline-block'
                                                />
                                                <label htmlFor={address.id} className='inline-block ml-1.5'>
                                                    {address.street}, {address.city}, {address.state}, {address.zip}, {address.country}
                                                </label>
                                            </div>
                                            {address.isDefault && <div> <p className='bg-primary max-w-fit px-2 mb-3.5 rounded-md text-neutral-100 font-medium text-sm'>
                                                Default
                                            </p></div>
                                            }
                                        </div>
                                    ))}
                                </RadioGroup>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
