interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
    darkTheme: boolean;
}

export default function MenuIcon({
    handleClick,
    isOpen,
    darkTheme,
}: MenuIconProps) {
    return (
        <div
            className={`menu-icon fixed top-0 right-0 py-1 px-1`}
            onClick={handleClick}
        >
            <div className={isOpen ? "is-opened" : "hamburger"}>
                <svg
                    className="hamburger"
                    stroke={darkTheme ? "#F8F8F8" : "#303030"}
                >
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--top"
                    />
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--mid"
                    />
                    <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        className="hamburger__bar hamburger__bar--bot"
                    />
                </svg>
            </div>
        </div>
    );
}
