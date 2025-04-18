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
     name: 'image',
     title: 'Product Image',
     type: 'image',
     options: {
       hotspot: true,
     }
   },
   {
     name: 'description',
     title: 'Description',
     type: 'text'
   }
 ]
}
