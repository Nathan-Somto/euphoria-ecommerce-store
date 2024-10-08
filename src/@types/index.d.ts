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
type ProductChartProps = RevenueChartProps;
type NotificationBadgeProps = {
  value: string | number;
  size?: number;
  className?: string;
};
type CategoryFormProps = {
  initialData?: {
    name: string | undefined;
  };
  categoryNames: string[];
  categoryId?: string;
};
type HeadingProps = {
  title: string;
  description?: string;
};
type CellActionProps = {
  id: string;
  name: string;
  createdAt: Date;
  products: {
    id: string;
  }[];
};
type CustomDialogProps = {
  open?: boolean;
  text?: string;
  withTrigger?: boolean;
};
type ProductFormProps = {
  forEdit: boolean;
  productId: string;
  categories: { id: string; name: string }[];
};
type ProductFormButtonProps = {
  forEdit: boolean;
  pending: boolean;
};
type SearchBarProps = {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  useDebounce?: boolean;
  debounceTime?: number;
};
type ServerActionReturnType<
  T extends (...args: any) => Promise<any | undefined>
> = Exclude<Awaited<ReturnType<T>>["data"], undefined>;
