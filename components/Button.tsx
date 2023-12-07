interface ButtonProps {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
    return (
        <button className="py-1 px-10 my-2 text-white bg-lime rounded-3xl hover:bg-gray hover:text-black transition-colors duration-200 text-sm-heading font-black">
            {children}
        </button>
    );
};
export default Button;
