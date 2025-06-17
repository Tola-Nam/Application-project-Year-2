<template>
  <div class="bg-gray-900 min-h-screen p-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="car in cars" :key="car.id"
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <!-- Header with title and heart icon -->
          <div class="flex justify-between items-center p-4 pb-2">
            <h3 class="text-white font-medium text-sm">{{ car.title }}</h3>
            <button @click="toggleFavorite(car.id)" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" :class="car.isFavorite ? 'text-red-500 fill-current' : ''"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- Car Image -->
          <div class="px-4 pb-4">
            <div class="bg-gray-700 rounded-lg h-40 flex items-center justify-center overflow-hidden">
              <img :src="car.image" :alt="car.title" class="w-full h-full object-cover" @error="handleImageError"/>
            </div>
          </div>

          <!-- Car Details -->
          <div class="px-4 pb-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-4 text-gray-400 text-xs">
                <div class="flex items-center space-x-1">
                  <span class="text-blue-400">🚗</span>
                  <span>{{ car.seats }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-blue-400">⚙️</span>
                  <span>{{ car.transmission }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-gray-400 text-xs">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span>{{ car.rating }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-green-400">👥</span>
                  <span>{{ car.reviews }} {{ car.transmission }}</span>
                </div>
              </div>
              <div class="text-white font-bold text-lg">
                ${{ car.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cars = ref([
  {
    id: 1,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: false
  },
  {
    id: 6,
    title: 'Porsche 718 Cayman S',
    image: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=400&h=300&fit=crop&crop=center',
    seats: 4,
    transmission: 'Manual',
    rating: 4,
    reviews: 12,
    price: '400.0',
    isFavorite: false
  }
])

const toggleFavorite = (carId) => {
  const car = cars.value.find(c => c.id === carId)
  if (car) {
    car.isFavorite = !car.isFavorite
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300/374151/9CA3AF?text=Porsche+718+Cayman+S'
}
</script>

<style scoped>
/* Additional custom styles if needed */
.grid {
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>