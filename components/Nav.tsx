import { useProjectLayoutStore, setLayoutProps } from "@/stores/projectLayout";

export default function Nav() {
    const { setLayout, layout } = useProjectLayoutStore() as setLayoutProps;

    const renderNavItem = (type: "LIST" | "ICONS") => (
        <li
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLayout(type)}
        >
            <button
                className={`dot ${layout === type ? "bg-lime" : "bg-gray"}`}
            />
            <p>{type}</p>
        </li>
    );

    return (
        <nav className="col-span-3">
            <ul className="flex gap-6">
                SHOW ITEMS AS
                {renderNavItem("LIST")}
                {renderNavItem("ICONS")}
            </ul>
        </nav>
    );
}
