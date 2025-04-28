import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'jpvzme6t',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

// Fetch all products
export async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    title,
    slug,
    price,
    availability,
    featured,
    "imageUrl": image.asset->url,
    category->{
      name,
      slug
    },
    description
  }`
  return await sanityClient.fetch(query)
}

// Fetch products by category slug
export async function getProductsByCategory(categorySlug) {
  const query = `*[_type == "product" && category->slug.current == $categorySlug]{
    _id,
    title,
    slug,
    price,
    availability,
    featured,
    "imageUrl": mainImage.asset->url,
    category->{
      name,
      slug
    },
    description
  }`
  return await sanityClient.fetch(query, { categorySlug })
}

// Fetch featured products
export async function getFeaturedProducts() {
  const query = `*[_type == "product" && featured == true]{
    _id,
    title,
    slug,
    price,
    availability,
    featured,
    "imageUrl": mainImage.asset->url,
    category->{
      name,
      slug
    },
    description
  }`
  return await sanityClient.fetch(query)
}

// Fetch products with specific availability status
export async function getProductsByAvailability(isAvailable) {
  const query = `*[_type == "product" && availability == $isAvailable]{
    _id,
    title,
    slug,
    price,
    availability,
    featured,
    "imageUrl": image.asset->url,
    category->{
      name,
      slug
    },
    description
  }`
  return await sanityClient.fetch(query, { isAvailable })
}

// Fetch blogs
export async function getBlogs() {
  const query = `*[_type == "blog"] | order(publishedAt desc){
    _id,
    title,
    slug,
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    body
  }`
  return await sanityClient.fetch(query)
}

// Fetch a single product by slug
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    price,
    description,
    availability,
    featured,
    quantity,
    "imageUrl": image.asset->url,
    "category": category->name,
    "categorySlug": category->slug.current
  }`;
  
  return await sanityClient.fetch(query, { slug });
}
