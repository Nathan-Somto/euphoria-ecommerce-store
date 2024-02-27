type SidebarProps = {
    isDesktop?: boolean;
    isMobile?: boolean;
}
type userButtonProps = {
    username: string;
    id: string;
    profilePhoto: string;
}
type KpiCardProps = {
    title: string;
    content: number;
    format:boolean
}
type RevenueChartProps = {
    chartData: {
        name : string;
        [x: string]: string | number
    }[]
}
type NotificationBadgeProps = {
    value: string | number;
    size?: number;
    className?: string
}