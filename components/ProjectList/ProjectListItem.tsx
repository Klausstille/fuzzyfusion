export default function ProjectListItem({
    children,
    active,
}: {
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <section
            className={`${
                active && "bg-gray"
            } flex items-center h-7 pl-6 rounded-sm hover:bg-gray hover:bg-opacity-30 cursor-pointer transition-colors duration-200 ease-in-out `}
        >
            {children}
        </section>
    );
}
