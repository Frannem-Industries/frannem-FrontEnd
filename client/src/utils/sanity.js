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
    "imageUrl": image.asset->url,
    category->{
      name,
      slug
    },
    description
  }`
  return await sanityClient.fetch(query, { categorySlug })
}

// Fetch featured products (you can define what makes a product featured in Sanity)
export async function getFeaturedProducts() {
  const query = `*[_type == "product" && featured == true]{
    _id,
    title,
    slug,
    price,
    availability,
    "imageUrl": image.asset->url,
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
