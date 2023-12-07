interface MenuIconProps {
    handleClick: () => void;
    isOpen: boolean;
}

export default function MenuIcon({ handleClick, isOpen }: MenuIconProps) {
    return (
        <div className="menu-icon absolute top-2 right-2" onClick={handleClick}>
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
