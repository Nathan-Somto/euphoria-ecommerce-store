import { Heading } from '@/components/ui/heading'

export default function AdminSettingsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8 mt-16">
                <Heading
                    title="Settings Page"
                    description="Manage your settings here"
                />
            </div>
            {/* Add some dummy settings stuff here */}
            <p>
                this is the settings page for the admin panel. You can manage your settings here.
            </p>
        </div>
    )
}
