import { FunctionComponent } from 'react';

interface ButtonProps {
    text: string;
}

const Button: FunctionComponent<ButtonProps> = ({ text }) => {
    return (
        <button className='py-2 px-6 my-8 text-black bg-white rounded-3xl hover:bg-gray hover:text-white transition-colors duration-200'>
            {text}
        </button>
    );
};

export default Button;
