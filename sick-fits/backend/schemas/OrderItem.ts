import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const OrderItem = list({
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineEdit: { fields: ['image', 'altText'] },
        inlineCreate: { fields: ['image', 'altText'] },
      },
    }),
    order: relationship({ ref: 'Order.items' }),
    price: integer(),
    quantity: integer(),
  },
});
