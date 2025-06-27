<template>
  <div class="bg-white min-h-screen p-1">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <router-link :to="{ path: 'detail', query: { category: item.category } }" v-for="item in items" :key="item.category"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 pb-2">
            <h3 class="text-gray-800 font-semibold text-sm truncate">
              {{ item.productName }}
            </h3>
            <button @click="toggleFavorite(item.pro_id)" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" :class="item.isFavorite ? 'text-red-500 fill-current' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- Image -->
          <div class="px-4 pb-4">
            <div class="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
              <img :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`" :alt="item.productName" class="w-full h-full object-cover"/>
            </div>
          </div>

          <!-- Details -->
          <div class="px-4 pb-4">
            <div class="flex items-center justify-between mb-3 text-gray-500 text-xxl">
              <div class="flex items-center space-x-1 max-w-[120px]">
                <span class="text-blue-500">📔</span>
                <span class="text-base text-gray-500 truncate overflow-hidden whitespace-nowrap">{{ item.description }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-blue-500">⚙️</span>
                <span class="text-base">{{ item.color }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between text-gray-600 text-xs">
              <div class="mb-2">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-500 text-base">⭐</span>
                  <span class="text-yellow-500 font-mono text-base">{{ item.length }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="text-green-500 text-base">👥</span>
                  <span class="text-green-500 font-mono text-base">{{ item.stock }}</span>
                </div>
              </div>
              <div class="text-red-500 font-mono text-lg ml-auto">
                ${{ item.price }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const items = ref([])

onMounted(async () => {
  const category = route.query.category //  Get category from URL : ? category

  if (!category) {
    console.error("Missing category in URL")
    return
  }

  try {
    const res = await fetch(`http://localhost/ApplicationBackend/api/middleware/api_fecth_category.php?category=${category}`)
    const json = await res.json()

    if (json.status && Array.isArray(json.data)) {
      items.value = json.data.map(item => ({
        ...item,
        isFavorite: false
      }))
    } else {
      console.error('Expected array in data, got:', json)
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
})

const toggleFavorite = (id) => {
  const item = items.value.find(i => i.pro_id === id)
  if (item) item.isFavorite = !item.isFavorite
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