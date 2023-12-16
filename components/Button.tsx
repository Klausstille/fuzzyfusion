interface ButtonProps {
    children: React.ReactNode;
}
import { useColorThemeStore, DarkTheme } from "@/stores/colorTheme";
const Button: React.FC<ButtonProps> = ({ children }) => {
    const { darkTheme } = useColorThemeStore() as DarkTheme;
    return (
        <button
            className={`${
                darkTheme
                    ? "hover:bg-black bg-[#2b2b2b] text-white"
                    : "hover:bg-gray bg-[#f0f0f0] text-black"
            } py-1 px-6 rounded-3xl transition-colors duration-200 text-sm-heading font-black`}
        >
            {children}
        </button>
    );
};
export default Button;
