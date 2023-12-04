export default function Nav() {
    return (
        <nav>
            <ul className="flex gap-4">
                SHOW ITEMS AS
                <li className="flex items-center gap-2">
                    <div className="dot bg-lime"></div>
                    <p>LIST</p>
                </li>
                <li className="flex items-center gap-2">
                    <div className="dot bg-light-gray"></div>
                    <p>ICONS</p>
                </li>
            </ul>
        </nav>
    );
}
