import React from 'react';

export enum ProjectTypeEnum {
  Deck = 'deck',
  PoolFence = 'pool_fence',
  Gutters = 'gutters',
}

export interface Material {
  id: string;
  name: string;
  costPerSqFt: number;
  imageUrl: string;
}

export interface ProjectType {
  id: ProjectTypeEnum | string;
  name: string;
  materials: Material[];
  icon: React.ElementType;
}

export interface GalleryImage {
  id: number | string;
  src: string;
  alt: string;
  category: ProjectTypeEnum | string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  avatarUrl: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: {
    url: string;
  };
}

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
}

export interface Service {
  name: string;
  description: string;
  icon: string; // Icon name as a string key
}

export interface ServiceSection {
  title: string;
  services: Service[];
}

export interface ServicesData {
  screenedPorch: ServiceSection;
  otherExterior: ServiceSection;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  type: 'before' | 'after';
}

export interface CaseStudyVideo {
  id: string; // YouTube ID
  title: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  description: string;
  squareFootage: number;
  projectType: ProjectTypeEnum | string;
  mainImage: string;
  images: CaseStudyImage[];
  videos: CaseStudyVideo[];
}
