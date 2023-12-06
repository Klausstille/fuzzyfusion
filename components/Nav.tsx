export default function Nav() {
    return (
        <nav className="col-span-3">
            <ul className="flex gap-6">
                SHOW ITEMS AS
                <li className="flex items-center gap-2">
                    <div className="dot bg-lime"></div>
                    <p>LIST</p>
                </li>
                <li className="flex items-center gap-2">
                    <div className="dot bg-gray"></div>
                    <p>ICONS</p>
                </li>
            </ul>
        </nav>
    );
}
