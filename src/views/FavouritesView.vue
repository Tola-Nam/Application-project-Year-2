<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-slate-800 text-white">
      <!-- Top Navigation -->
      <div class="bg-slate-900 py-2">
        <div class="container mx-auto px-4 text-sm">
          <div class="flex justify-between items-center">
            <div class="flex space-x-6">
              <a href="#" class="hover:text-blue-400 transition-colors">DOWNLOADS</a>
              <a href="#" class="hover:text-blue-400 transition-colors">CONTACT</a>
              <a href="#" class="hover:text-blue-400 transition-colors">NEWSLETTER</a>
              <a href="#" class="hover:text-blue-400 transition-colors">ABOUT US</a>
            </div>
            <div class="flex items-center space-x-4">
              <span>🏴‍☠️ ENGLISH</span>
              <span>💰 USD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">🐟</span>
            </div>
            <div>
              <h1 class="text-xl font-bold">FISHING STORE</h1>
              <p class="text-xs text-gray-300">EVERYTHING FOR FISHING</p>
            </div>
          </div>

          <div class="flex-1 max-w-md mx-8">
            <div class="relative">
              <input type="text" placeholder="Search products..." v-model="searchQuery"
                  class="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button class="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                🔍
              </button>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button class="hover:text-blue-400 transition-colors">
              ❤️ Wishlist ({{ wishlistCount }})
            </button>
            <button class="hover:text-blue-400 transition-colors">
              🛒 Cart ({{ cartCount }})
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="bg-slate-700 py-3">
        <div class="container mx-auto px-4">
          <div class="flex space-x-8">
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">HOME</a>
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">SHOP</a>
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">CATEGORIES</a>
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">BRANDS</a>
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">SALE</a>
            <a href="#" class="hover:text-blue-400 transition-colors font-medium">BLOG</a>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="relative">
      <div class="flex">
        <!-- Main Hero Image -->
        <div class="flex-1 relative">
          <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop" alt="Fishing Boat"
              class="w-full h-96 object-cover"/>
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div class="text-center text-white">
              <h2 class="text-4xl font-bold mb-2">Premium Fishing Gear</h2>
              <p class="text-lg mb-4">Everything you need for your next fishing adventure</p>
              <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        <!-- Sale Banner -->
        <div class="w-80 bg-gray-600 text-white p-8 flex flex-col justify-center">
          <h3 class="text-3xl font-bold mb-2">SALE</h3>
          <p class="text-5xl font-bold text-yellow-400 mb-2">-50%</p>
          <p class="text-sm mb-4">Special discount on fishing equipment. Limited time offer!</p>
          <button class="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold transition-colors">
            SHOP SALE
          </button>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="category in categories" :key="category.name"
              class="category-card relative rounded-lg overflow-hidden cursor-pointer" @click="selectCategory(category.name)">
            <img :src="category.image" :alt="category.name" class="w-full h-48 object-cover"/>
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div class="text-center text-white">
                <h3 class="text-xl font-bold mb-2">{{ category.name }}</h3>
                <button class="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Products Section -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8 text-center">NEW PRODUCTS</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in products" :key="product.id"
              class="product-card bg-white rounded-lg shadow-md overflow-hidden">
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover"/>
              <button @click="toggleWishlist(product.id)" class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  :class="{ 'text-red-500': product.inWishlist, 'text-gray-400': !product.inWishlist }">
                ❤️
              </button>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ product.category }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                    ${{ product.originalPrice }}
                  </span>
                </div>
                <button @click="addToCart(product)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">FISHING STORE</h3>
            <p class="text-gray-300 text-sm">
              Your premier destination for all fishing equipment and accessories.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">CATEGORIES</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><a href="#" class="hover:text-white">Fishing Rods</a></li>
              <li><a href="#" class="hover:text-white">Reels</a></li>
              <li><a href="#" class="hover:text-white">Tackle</a></li>
              <li><a href="#" class="hover:text-white">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">CUSTOMER SERVICE</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">Shipping Info</a></li>
              <li><a href="#" class="hover:text-white">Returns</a></li>
              <li><a href="#" class="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">NEWSLETTER</h4>
            <p class="text-gray-300 text-sm mb-4">
              Subscribe for updates and special offers
            </p>
            <div class="flex">
              <input type="email" placeholder="Your email" v-model="newsletterEmail"
                  class="flex-1 px-3 py-2 rounded-l-lg text-black focus:outline-none"/>
              <button @click="subscribeNewsletter" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const searchQuery = ref('')
const cartCount = ref(0)
const wishlistCount = ref(0)
const newsletterEmail = ref('')

// Sample data
const categories = ref([
  {
    name: 'FLY FISHING',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  },
  {
    name: 'RODS & REELS',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    name: 'SPORT BAITS',
    image: 'https://images.unsplash.com/photo-1594736797933-d0a9ba6c6db0?w=400&h=300&fit=crop'
  }
])

const products = ref([
  {
    id: 1,
    name: 'Camping Cooler',
    price: 64.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    category: 'Camping',
    inWishlist: false
  },
  {
    id: 2,
    name: 'Fishing Reel - Blue',
    price: 89.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
    category: 'Reels',
    inWishlist: false
  },
  {
    id: 3,
    name: 'Fishing Hooks - Premium',
    price: 12.45,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594736797933-d0a9ba6c6db0?w=300&h=200&fit=crop',
    category: 'Tackle',
    inWishlist: false
  },
  {
    id: 4,
    name: 'Spinning Reel - Professional',
    price: 149.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    category: 'Reels',
    inWishlist: false
  },
  {
    id: 5,
    name: 'Fishing Rod Kit',
    price: 89.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=200&fit=crop',
    category: 'Rods',
    inWishlist: false
  },
  {
    id: 6,
    name: 'Carbon Fiber Rods',
    price: 125.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    category: 'Rods',
    inWishlist: false
  },
  {
    id: 7,
    name: 'Waterproof Boots',
    price: 89.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop',
    category: 'Footwear',
    inWishlist: false
  },
  {
    id: 8,
    name: 'Tackle Box - Large',
    price: 54.95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    category: 'Storage',
    inWishlist: false
  }
])

// Methods
const addToCart = (product) => {
  cartCount.value++
  console.log(`Added ${product.name} to cart`)
}

const toggleWishlist = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.inWishlist = !product.inWishlist
    if (product.inWishlist) {
      wishlistCount.value++
    } else {
      wishlistCount.value--
    }
  }
}

const selectCategory = (categoryName) => {
  console.log(`Selected category: ${categoryName}`)
}

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log(`Subscribed: ${newsletterEmail.value}`)
    newsletterEmail.value = ''
  }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.category-card {
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: scale(1.02);
}
</style>