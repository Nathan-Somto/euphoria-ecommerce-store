// Component Props
type SidebarProps = {
  isDesktop?: boolean;
  isMobile?: boolean;
};
type userButtonProps = {
  username: string;
  id: string;
  profilePhoto: string;
};
type KpiCardProps = {
  title: string;
  content: number;
  format: boolean;
};
type RevenueChartProps = {
  chartData: {
    name: string;
    [x: string]: string | number;
  }[];
};
type NotificationBadgeProps = {
  value: string | number;
  size?: number;
  className?: string;
};
type CategoryFormProps = {
  initialData?: {
    name:string | undefined;
  },
  categoryNames: string[]
  categoryId?: string;
};
type  HeadingProps = {
    title: string;
    description: string;
  }
type CellActionProps = {
  id: string;
  name: string;
  createdAt: Date;
  products: {
      id: string;
  }[];
};
type CustomDialogProps = {
  open?: boolean,
  text?: string,
  withTrigger?: boolean
}