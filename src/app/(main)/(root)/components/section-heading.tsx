import { cn } from "@/lib/utils";

type Props = {
    title: string;
    className?: string;
}
export default function SectionHeading({ title, className }: Props) {
    return (
        <div className="flex gap-x-4 items-center ">
            <div className="h-[30px] rounded-[10px] w-1.5 bg-primary "></div>
            <h3 className={cn("text-center capitalize md:text-left  text-primary-foreground font-semibold text-2xl md:text-3xl lg:text-4xl ", className)}>
                {title}
            </h3>
        </div>
    )
}