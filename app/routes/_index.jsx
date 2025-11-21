import {Await, useLoaderData, Link} from 'react-router';
import {Suspense, useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import lentilImage from '../assets/s1.png';
import nachoImage from '../assets/s2.png';
import thaiImage from '../assets/s3.png';
import secondSecImage from '../assets/second-sec-image.png';

import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};
const COLORS = {
  teal: "#feecbe",
  text: "#181147"
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();


  // --- CAROUSEL STATE & DATA ---

  const carouselItems = [
    {
      id: 1,
      title: "LENTIL DHAL",
      type: "ORGANIC READY MEALS",
      color: "bg-[#2D6F77]", // Teal
      accent: "bg-[#A7DADB]",
      image: lentilImage, 
      description: "A hearty organic lentil dhal with rich spices.",
    },
    {
      id: 2,
      title: "NACH-NO CHEESE",
      type: "PLANT-BASED SAUCES",
      color: "bg-[#F4A936]", // Yellow/Orange
      accent: "bg-[#FDE6A6]",
      image: nachoImage,
      description: "A velvety nacho-style cheese sauce with sweet potato.",
    },
    {
      id: 3,
      title: "THAI CURRY",
      type: "ORGANIC READY MEALS",
      color: "bg-[#6FA83E]", // Green
      accent: "bg-[#D2E8B8]",
      image: thaiImage,
      description: "A vibrant green Thai curry packed with vegetables.",
    },
    // Adding duplicates just to make the slider feel fuller if needed, 
    // or you can just repeat the array.
    {
      id: 4,
      title: "LENTIL DHAL",
      type: "ORGANIC READY MEALS",
      color: "bg-[#2D6F77]",
      accent: "bg-[#A7DADB]",
      image: lentilImage,
      description: "A hearty organic lentil dhal with rich spices.",
    },
  ];

  // const handlePrev = () => {
  //   setActiveIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  // };

  // const handleNext = () => {
  //   setActiveIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  // };
  // -----------------------------

useEffect(() => {
  // Function to update cart icon
  const updateCartIcon = () => {
    const cartLink = document.querySelector(
      'body > header > nav.header-ctas > a:nth-child(4)',
    );
    
    if (cartLink && !cartLink.querySelector('svg')) {
      const cartIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      `;
      cartLink.innerHTML = cartIcon;
    }
  };

  // Try immediately
  updateCartIcon();

  // Try again after a short delay (for when header loads slowly)
  const timeout = setTimeout(updateCartIcon, 100);

  // Also observe DOM changes
  const observer = new MutationObserver(updateCartIcon);
  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    clearTimeout(timeout);
    observer.disconnect();
  };
}, []);
return (
  <div className="bg-white">
    {/* Hero Section */}
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="https://cdn.shopify.com/s/files/1/0979/1294/7017/files/first-section.jpg?v=1763660544"
        alt="Hero background"
        className="w-full h-full object-cover"
      />
    </div>

{/* Big Flavour Section - SWIPER VERSION */}
    <div className="bg-[#feecbe] py-20 px-4 relative overflow-hidden">
      
      {/* 1. Header & Hand Section */}
      <div className="max-w-4xl mx-auto text-center relative mb-12">
        
        {/* The Text Group */}
        <div className="inline-block relative z-10 ">
          <h3 className="text-4xl md:text-5xl font-extrabold -tracking-wider  text-[#181147] leading-[0.9]">
            Big flavour. Bold vibes.
          </h3>
          <h3 className="text-4xl md:text-5xl font-extrabold -tracking-wider  text-[#181147] leading-[1] mt-2 mb-5">
            100% plant-powered joy.
          </h3>
          
          {/* Description Text */}
       <p className="mt-8  text-lg font-bold text-[#181147] max-w-sm mx-auto  text-center leading-relaxed md:max-w-md lg:max-w-lg">
  Stoked takes street-food soul and packs it into meals and sauces that are chef-made, ready in minutes, and impossible not to love.
</p>

          {/* The Hand Icon - Positioned absolutely relative to the text block */}
          <div className="hidden md:block absolute -right-72 top-0 transform -rotate-12 z-0">
             <img
             src={secondSecImage}
             alt="Hand holding a can"
             className=" w-56 h-auto z-0"
            />
          </div>
        </div>
      </div>

      {/* 3. Shop Button (Centered below slider) */}
      <div className="text-center mt-8">
        <button className="bg-[#F4A936] text-white text-xl font-black py-3 px-10 cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase">
            Shop Now
        </button>
      </div>

    </div>

    {/* Full of Beans Section */}
    <div className="bg-cyan-400 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-7xl md:text-9xl font-black text-green-600 text-center mb-12" style={{lineHeight: '0.9'}}>
          FULL OF BEANS<br />BIG ON FLAVOUR
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="bg-yellow-300 w-16 h-16 rounded-full"></div>
            <h3 className="text-3xl font-black text-gray-900">Food that tastes good</h3>
            <p className="text-lg text-gray-800">
              We're serious about our meals tasting amazing. And we mean really amazing. 
              Every STOKED! meal is packed full of big, bold flavours that'll make your 
              taste buds dance with joy.
            </p>
          </div>
          <div className="aspect-square bg-white/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-700 font-semibold">Image Placeholder</p>
          </div>
        </div>
      </div>
    </div>

    {/* Food that does good Section */}
    <div className="bg-gradient-to-br from-orange-200 to-pink-200 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="aspect-square bg-yellow-300/50 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-orange-300 rounded-full flex items-center justify-center">
              <div className="text-6xl">❤️</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-red-500 w-16 h-16 rounded-full"></div>
          <h3 className="text-3xl font-black text-gray-900">Food that does good</h3>
          <p className="text-lg text-gray-800">
            Every STOKED! meal is 100% plant-based and made with natural ingredients. 
            Better for you, better for the planet. It's a win-win situation that'll 
            make you feel amazing inside and out.
          </p>
        </div>
      </div>
    </div>

    {/* Recipe Grid Section */}
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">From tin to table</h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Ready in minutes, enjoyed for hours. Just heat, eat, and feel the STOKED! energy.
          </p>
        </div>

        {/* Recipe Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 font-semibold">Recipe Image {i}</p>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900">Recipe Title {i}</h4>
                <p className="text-sm text-gray-600 mt-2">Quick and delicious meal ready in minutes.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Newsletter Section */}
    <div className="bg-gradient-to-br from-pink-300 to-pink-400 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🤙</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Get Stoked near you</h2>
        <p className="text-lg text-gray-800 mb-6">
          Sign up to find out when STOKED! lands in a store near you
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-900 font-semibold"
          />
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
            →
          </button>
        </div>
      </div>
    </div>

    {/* Agent Section */}
    <div className="bg-green-500 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Get Stoked for your event
        </h2>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          Planning a festival, corporate event, or party? Stock up on STOKED! 
          and give your guests meals they'll actually want to eat.
        </p>
        <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
          GET IN TOUCH
        </button>
        
        {/* Event Images Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-white/30 rounded-lg flex items-center justify-center">
              <p className="text-white font-semibold">Event Photo {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Logo */}
    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 py-20 text-center">
      <h1 className="text-8xl md:text-9xl font-black text-gray-900 mb-4">STOKED!</h1>
      <div className="flex justify-center gap-4 text-2xl mb-8">
        <span>📷</span>
        <span>🐦</span>
        <span>📘</span>
      </div>
      <p className="text-gray-800 font-semibold">PRIVACY POLICY</p>
    </div>
  </div>
);
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products text-red-500">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
