import React from "react";

type JsonLdProps = {
  data: Record<string, any>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateProductJsonLd(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://bodybiohacker.online${product.images.thumbnail}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://bodybiohacker.online/reviews/${product.category}/${product.slug}`,
      priceCurrency: "INR",
      price: product.pricing.current_price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratings.overall,
      bestRating: "10",
      worstRating: "1",
      ratingCount: "1", // Hardcoded as we are the reviewer
    },
  };
}

export function generateArticleJsonLd(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: `https://bodybiohacker.online${post.image}`,
    author: {
      "@type": "Organization",
      name: "BodyBio Hacker Team",
    },
    publisher: {
      "@type": "Organization",
      name: "BodyBio Hacker",
      logo: {
        "@type": "ImageObject",
        url: "https://bodybiohacker.online/icon-512.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
  };
}
