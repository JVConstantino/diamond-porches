
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
  id: ProjectTypeEnum;
  name: string;
  materials: Material[];
  icon: React.ElementType;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: ProjectTypeEnum;
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