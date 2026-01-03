import 'server-only';
import { after } from 'next/server';

export function trackView(slug: string) {
  // This runs AFTER the page loads, so it doesn't slow down the user
  after(async () => {
    console.log(`[Analytics] User viewed: ${slug} at ${new Date().toISOString()}`);
    // later, connect this to your MongoDB:
    // await AnalyticsModel.create({ page: slug, type: 'view' });
  });
}