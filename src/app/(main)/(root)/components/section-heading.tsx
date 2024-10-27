type Props = {
    title: string;
}
export default function SectionHeading({title}: Props) {
    return (
        <h3 className="border-l-primary border-none md:border-solid text-center md:text-left md:border-l-2 pl-2 text-primary-foreground font-semibold text-2xl md:text-3xl lg:text-4xl ">
            {title}
        </h3>
    )
}