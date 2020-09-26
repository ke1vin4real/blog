import { HOST } from './utils/constant';

const title = 'Kelvin – Development and creation.';

const description = 'Full-tack developer, JavaScript enthusiast.';

const SEO = {
  title,
  description,
  canonical: `https://${HOST}`,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: `https://${HOST}`,
    title,
    description,
  },
};

export default SEO;
