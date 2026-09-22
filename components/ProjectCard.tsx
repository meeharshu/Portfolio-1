
import React from 'react';
import type { Project } from '../types';
import { ExternalLinkIcon, GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    // The main container. On desktop (md+), it becomes a relative frame for positioning.
    <div className="group bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 overflow-hidden md:relative transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-black/30">
      
      {/* Image. It's a block element that defines the card's dimensions on desktop. */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 ease-in-out md:group-hover:scale-105"
      />
      
      {/* Gradient overlay. Hidden on mobile, visible and absolute on desktop. */}
      <div className="hidden md:block md:absolute md:inset-0 md:bg-gradient-to-t from-white/90 via-white/70 to-transparent dark:from-black/95 dark:via-black/80 md:backdrop-blur-sm" />
      
      {/* Content Section. On mobile, this is a standard padded block below the image. 
          On desktop, it's an absolute overlay. */}
      <div className="p-6 md:absolute md:inset-0 md:p-6 md:flex md:flex-col md:justify-end">
        
        <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{project.title}</h3>
        
        {/* Description. Always visible on mobile. On desktop, it's hidden and fades in on hover. */}
        <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-screen transition-all duration-500 ease-in-out">
          {project.description}
        </p>
        
        {/* Tags. Always visible on mobile. On desktop, they fade in on hover. */}
        <div className="flex flex-wrap gap-2 mt-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-200">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold bg-black/10 text-black dark:bg-white/10 dark:text-white px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
        
        {/* Links. Always visible on mobile. On desktop, they fade in on hover. */}
        <div className="pt-4 mt-auto flex space-x-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 md:delay-300">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center">
              <ExternalLinkIcon className="mr-2"/> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center">
              <GithubIcon className="mr-2"/> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};