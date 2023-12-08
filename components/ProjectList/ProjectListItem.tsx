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
                active
                    ? "bg-gray hover:bg-gray opacity-100"
                    : "hover:bg-gray hover:bg-opacity-30 cursor-pointer transition-colors duration-200 ease-in-out"
            } text-s-bold flex items-center h-6 pl-5 rounded-sm`}
        >
            {children}
        </section>
    );
}
