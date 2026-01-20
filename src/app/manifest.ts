import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BodyBio Hacker',
    short_name: 'BBHacker',
    description: 'Analytics-driven supplement reviews and tracking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#00ff41',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  };
}
