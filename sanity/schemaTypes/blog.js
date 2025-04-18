export default {
 name: 'blog',
 title: 'Blog Post',
 type: 'document',
 fields: [
   {
     name: 'title',
     title: 'Title',
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
     name: 'coverImage',
     title: 'Cover Image',
     type: 'image',
     options: { hotspot: true }
   },
   {
     name: 'body',
     title: 'Content',
     type: 'array',
     of: [{ type: 'block' }]
   },
   {
     name: 'publishedAt',
     title: 'Published At',
     type: 'datetime'
   }
 ]
}
