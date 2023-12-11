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
                    ? "hover:bg-gray bg-black hover:text-black text-white"
                    : "hover:bg-black bg-gray text-black hover:text-white"
            } py-1 px-10 my-2 rounded-3xl transition-colors duration-200 text-sm-heading font-black`}
        >
            {children}
        </button>
    );
};
export default Button;
