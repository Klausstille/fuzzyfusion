interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function MenuIcon({ handleClick, isOpen }: MenuIconProps) {
    return (
        <div
            className="menu-icon fixed top-0 right-0 bg-light-gray py-2 px-2"
            onClick={handleClick}
        >
            <div className={isOpen ? "is-opened" : "hamburger"}>
                <svg className="hamburger">
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
