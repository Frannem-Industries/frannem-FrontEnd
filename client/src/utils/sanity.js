import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'jpvzme6t',  
  dataset: 'production',            
  apiVersion: '2023-01-01',         
  useCdn: true,                     
});

export async function getProducts() {
 const query = `*[_type == "product"]{
   _id,
   title,
   slug,
   price,
   "imageUrl": image.asset->url,
   category->{
     name,
     slug
   },
   description
 }`

 return await sanityClient.fetch(query)
}

export async function getBlogs() {
 const query = `*[_type == "blog"] | order(publishedAt desc){
   _id,
   title,
   slug,
   coverImage,
   publishedAt,
   body
 }`

 return await sanityClient.fetch(query)
}

