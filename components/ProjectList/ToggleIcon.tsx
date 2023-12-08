type ToggleIconProps = {
    isOpen: boolean;
};

export default function ToggleIcon({ isOpen }: ToggleIconProps) {
    return (
        <div>
            <svg
                className="arrow"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {isOpen ? (
                    <path
                        d="M2.33341 1.33357L6.00008 5.00024L2.33341 8.66691"
                        stroke="#303030"
                        strokeWidth="1"
                    />
                ) : (
                    <path
                        d="M2.33341 1.33357L6.00008 5.00024L9.66675 1.33357"
                        stroke="#303030"
                        strokeWidth="1"
                    />
                )}
            </svg>
        </div>
    );
}
