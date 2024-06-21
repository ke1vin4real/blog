import { MetadataRoute } from 'next'
import { HOST } from '../utils/constant'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: `https://${HOST}/sitemap.xml`,
  }
}