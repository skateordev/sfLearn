import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinary = {
  apiKey: process.env.CLOUDINARY_KEY,
  folder: 'sickfits',
  apiSecret: process.env.CLOUDINARY_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
  },
});
