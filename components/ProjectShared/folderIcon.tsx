export default function FolderIcon({ darkTheme }: { darkTheme?: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            x="0px"
            y="0px"
            viewBox="10 20.17 80 59.66"
        >
            <path
                d="M15.76,76.95v-29.48c0-2.77,2.25-5.02,5.02-5.02h23.42c1.1,0,2.12-.64,2.59-1.63l1.84-3.8c.83-1.72,2.6-2.83,4.52-2.83h30.2v-2.88c0-1.59-1.29-2.88-2.88-2.88h-31.32c-1.91,0-3.68-1.11-4.52-2.83l-1.84-3.8c-.48-.99-1.5-1.63-2.59-1.63H12.88c-1.59,0-2.88,1.29-2.88,2.88v53.9c0,1.59,1.29,2.88,2.88,2.88s2.88-1.29,2.88-2.88Z"
                fill={darkTheme ? "#b4b4b4" : "#636363"}
            />
            <path
                d="M87.12,36.33H53.15c-1.1,0-2.12,.64-2.59,1.63l-1.84,3.8c-.83,1.72-2.6,2.83-4.52,2.83H20.78c-1.59,0-2.88,1.29-2.88,2.88v29.48c0,1.07-.34,2.07-.91,2.88H87.12c1.59,0,2.88-1.29,2.88-2.88V39.21c0-1.59-1.29-2.88-2.88-2.88Z"
                fill={darkTheme ? "#b4b4b4" : "#636363"}
            />
        </svg>
    );
}