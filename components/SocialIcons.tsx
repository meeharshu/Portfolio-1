
import React from 'react';
import type { SocialLink } from '../types';

interface SocialIconsProps {
    links: SocialLink[];
    iconClassName?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ links, iconClassName = "w-6 h-6" }) => {
    return (
        <div className="flex justify-center space-x-6">
            {links.map((link) => (
                <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                    <link.icon className={iconClassName} />
                </a>
            ))}
        </div>
    );
};