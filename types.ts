// Fix: Import React to provide the 'React' namespace for types.
import React from 'react';

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  skills: string[];
  description: string;
}

export interface Inspiration {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  motto: string;
}

export interface GearCategory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}
