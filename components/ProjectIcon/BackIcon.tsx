export default function BackIcon({ darkTheme }: { darkTheme?: boolean }) {
    return (
        <div>
            <svg
                className="arrow"
                width="10"
                height="10"
                viewBox="0 8 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.50024 16.6667L3.83357 13.0001L7.50024 9.33341"
                    stroke={darkTheme ? "#F8F8F8" : "#303030"}
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}
