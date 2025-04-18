
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
