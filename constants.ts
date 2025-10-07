import type { ProjectType, GalleryImage, Testimonial, YouTubeVideo } from './types';
import { ProjectTypeEnum } from './types';
import { 
    CubeIcon, 
    ShieldCheckIcon, 
    BeakerIcon,
    ScreenPorchIcon,
    SidingIcon,
    FenceIcon,
    ShutterIcon,
    WrenchScrewdriverIcon,
} from './components/Icons';


export const PROJECT_TYPES: ProjectType[] = [
  {
    id: ProjectTypeEnum.Deck,
    name: 'Decks & Patios',
    icon: CubeIcon,
    materials: [
      { id: 'wood', name: 'Pressure-Treated Wood', costPerSqFt: 25, imageUrl: 'https://picsum.photos/seed/wood/400/300' },
      { id: 'composite', name: 'Composite', costPerSqFt: 45, imageUrl: 'https://picsum.photos/seed/composite/400/300' },
      { id: 'pvc', name: 'PVC Decking', costPerSqFt: 55, imageUrl: 'https://picsum.photos/seed/pvc/400/300' },
    ],
  },
  {
    id: ProjectTypeEnum.PoolFence,
    name: 'Pool Fences',
    icon: ShieldCheckIcon,
    materials: [
      { id: 'mesh', name: 'Removable Mesh', costPerSqFt: 18, imageUrl: 'https://picsum.photos/seed/mesh/400/300' },
      { id: 'glass', name: 'Glass Panel', costPerSqFt: 150, imageUrl: 'https://picsum.photos/seed/glass/400/300' },
      { id: 'aluminum', name: 'Aluminum', costPerSqFt: 60, imageUrl: 'https://picsum.photos/seed/aluminum/400/300' },
    ],
  },
  {
    id: ProjectTypeEnum.Gutters,
    name: 'Gutter Guards',
    icon: BeakerIcon,
    materials: [
      { id: 'screen', name: 'Metal Screen', costPerSqFt: 8, imageUrl: 'https://picsum.photos/seed/screen/400/300' },
      { id: 'micro_mesh', name: 'Micro-Mesh', costPerSqFt: 20, imageUrl: 'https://picsum.photos/seed/micromesh/400/300' },
      { id: 'foam', name: 'Foam Insert', costPerSqFt: 12, imageUrl: 'https://picsum.photos/seed/foam/400/300' },
    ],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/deck1/800/600', alt: 'Modern composite deck', category: ProjectTypeEnum.Deck },
  { id: 2, src: 'https://picsum.photos/seed/pool1/800/600', alt: 'Sleek glass pool fence', category: ProjectTypeEnum.PoolFence },
  { id: 3, src: 'https://picsum.photos/seed/gutter1/800/600', alt: 'Gutter guard installation', category: ProjectTypeEnum.Gutters },
  { id: 4, src: 'https://picsum.photos/seed/deck2/800/600', alt: 'Spacious wooden patio', category: ProjectTypeEnum.Deck },
  { id: 5, src: 'https://picsum.photos/seed/pool2/800/600', alt: 'Secure mesh pool fence', category: ProjectTypeEnum.PoolFence },
  { id: 6, src: 'https://picsum.photos/seed/deck3/800/600', alt: 'Deck with integrated lighting', category: ProjectTypeEnum.Deck },
  { id: 7, src: 'https://picsum.photos/seed/gutter2/800/600', alt: 'Close-up of micro-mesh gutter', category: ProjectTypeEnum.Gutters },
  { id: 8, src: 'https://picsum.photos/seed/pool3/800/600', alt: 'Elegant aluminum pool fencing', category: ProjectTypeEnum.PoolFence },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The instant quote tool was incredibly accurate and helped us budget perfectly. The final deck exceeded our expectations. Truly professional service from start to finish!",
    author: 'John & Sarah Miller',
    location: 'Austin, TX',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
  },
  {
    id: 2,
    quote: "DIAMOND installed our pool fence just in time for summer. The peace of mind is priceless. Their team was efficient, clean, and very respectful of our property.",
    author: 'David Chen',
    location: 'Miami, FL',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
  },
  {
    id: 3,
    quote: "No more climbing ladders to clean gutters! The guards they installed work like a charm. The online estimator was a fantastic first step. Highly recommended.",
    author: 'Maria Garcia',
    location: 'Raleigh, NC',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
  },
];

export const SERVICES_DATA = {
  screenedPorch: {
    title: 'Screened Porch & Gutter Services',
    services: [
      {
        name: 'Motorized & Regular Porches',
        description: 'Custom screen solutions to enjoy the outdoors bug-free, perfectly matching your home and lifestyle.',
        icon: ScreenPorchIcon,
      },
      {
        name: 'Screen Repair & Replacement',
        description: 'From minor tear repairs to full screen replacement with high-quality mesh to renew your porch.',
        icon: WrenchScrewdriverIcon,
      },
      {
        name: 'Specialty Pet Screens',
        description: 'Durable, scratch-resistant mesh designed to keep your pets safe, secure, and contained.',
        icon: ShieldCheckIcon,
      },
      {
        name: 'Gutter Guard Installation',
        description: 'Durable, clog-resistant protectors that fit seamlessly onto your existing gutters to prevent debris.',
        icon: BeakerIcon,
      },
    ],
  },
  otherExterior: {
    title: 'Siding, Fences & Finishes',
    services: [
      {
        name: 'Vinyl Siding Replacement',
        description: 'Replace cracked, faded, or damaged siding to restore your home’s beauty and protection.',
        icon: SidingIcon,
      },
      {
        name: 'Shutter Services',
        description: 'Professional installation, repair, and replacement to enhance your home’s curb appeal.',
        icon: ShutterIcon,
      },
      {
        name: 'Fencing & Privacy Panels',
        description: 'Sturdy fences for privacy and security, including property dividers and decorative panels.',
        icon: FenceIcon,
      },
       {
        name: 'Exterior Fixture Mounting',
        description: 'Secure mounting for lights and outlets with professional box and J-block replacement.',
        icon: CubeIcon,
      },
    ],
  },
};

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
    { id: '4_Br5B62-YI', title: 'Modern Motorized Screen Enclosure', thumbnailUrl: 'https://img.youtube.com/vi/4_Br5B62-YI/hqdefault.jpg' },
    { id: 'G9B4jfpj-rA', title: 'Seamless Motorized Screen Installation', thumbnailUrl: 'https://img.youtube.com/vi/G9B4jfpj-rA/hqdefault.jpg' },
    { id: 'C2J4gLUnQuc', title: 'Full Screen Enclosure Replacement', thumbnailUrl: 'https://img.youtube.com/vi/C2J4gLUnQuc/hqdefault.jpg' },
    { id: 'rF8f6eYkM8U', title: 'Gutter Guard Installation Showcase', thumbnailUrl: 'https://img.youtube.com/vi/rF8f6eYkM8U/hqdefault.jpg' },
    { id: 'kF_TfE7p3jE', title: 'Durable Pet Screen for Porches', thumbnailUrl: 'https://img.youtube.com/vi/kF_TfE7p3jE/hqdefault.jpg' },
    { id: '8vXwE7p23-c', title: 'Elegant Motorized Screen Project', thumbnailUrl: 'https://img.youtube.com/vi/8vXwE7p23-c/hqdefault.jpg' },
];
