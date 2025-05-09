export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (₦)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'availability',
      title: 'In Stock',
      type: 'boolean',
      description: 'Is this product currently available for purchase?',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Display this product in featured sections',
      initialValue: false
    },
    {
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'additionalImages',
      title: 'Additional Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ],
      description: 'Add up to 2 additional product images (3 total including main image)',
      validation: Rule => Rule.max(2)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'quantity',
      title: 'Quantity Available',
      type: 'number',
      description: 'Number of items in stock',
      validation: Rule => Rule.min(0).precision(0),
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      media: 'mainImage',
      availability: 'availability'
    },
    prepare({ title, category, media, availability }) {
      return {
        title,
        subtitle: `${category || 'Uncategorized'} ${availability === false ? '(Out of Stock)' : ''}`,
        media
      }
    }
  }
};
