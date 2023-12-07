import { useState } from "react";
import MenuIcon from "./MenuIcon";

export default function FilterProjects() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => setIsOpen(!isOpen);

    return (
        <>
            <section
                className={`filter-projects ${
                    isOpen ? "open" : "closed"
                } fixed w-1/5 top-0 pt-2 pr-2 right-0 px-2 bg-light-gray`}
            >
                <h1
                    className="text-s-heading"
                    onClick={handleClick}
                    style={{ display: isOpen ? "block" : "none" }}
                >
                    FILTER
                </h1>
            </section>
            <MenuIcon isOpen={isOpen} handleClick={handleClick} />
        </>
    );
}
