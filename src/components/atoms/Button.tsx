import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ButtonProps {
    text: string;
    link?: string | any;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
    const [active, setActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setActive(router.pathname === link);
    }, [router.pathname, link]);

    return (
        <Link href={link}>
            <button
                className={`transition duration-300 ease-in-out transform border-b-4 ${active ? 'border-primary-blue hover:border-b-4 focus:border-b-4' : 'border-transparent'} text-stone-400 ${active ? 'text-primary-blue active:border-primary-blue focus:text-primary-blue focus:border-primary-blue' : ''}`}
            >
                {text}
            </button>
        </Link>
    );
}

export default Button;
