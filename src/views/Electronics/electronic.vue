<template>
  <div class="min-h-screen p-1">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="item in items" :key="item.category"
             class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <!-- Clickable router-link wrapper -->
          <router-link :to="{ path: 'detail', query: { category: item.category } }" class="block">
            <!-- Header -->
            <div class="flex justify-between items-center p-4 pb-2">
              <h3 class="text-gray-800 font-semibold text-sm truncate">
                {{ item.productName }}
              </h3>
            </div>

            <!-- Image -->
            <div class="px-4 pb-4">
              <div class="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
                <img :src="`http://localhost/ApplicationBackend/api/${item.thumbnail}`" :alt="item.productName" class="w-full h-full object-cover"/>
              </div>
            </div>
            <!-- Details -->
            <div class="px-4">
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

          <!-- Buttons OUTSIDE router-link -->
          <div class="flex justify-between px-4 pb-4">
            <button @click="toggleFavorite(item.pro_id)" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-5 h-5" :class="item.isFavorite ? 'text-red-500 fill-current' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            <div class="flex space-x-2 mt-4">
              <!-- Edit Button -->
              <button @click="openModal(item.pro_id)" class="flex items-center px-4 py-2 bg-green-400 hover:bg-green-600 text-white text-sm font-medium rounded-lg shadow transition">
                <i class="bi bi-pencil-square me-2"></i>Edit
              </button>

              <!-- Delete Button -->
              <button class="flex items-center px-4 py-2 bg-red-400 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow transition">
                <i class="bi bi-trash me-2"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  modal for update product -->
  <div class="p-6">
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" @click.self="showModal = false">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative space-y-6">
        <!-- Close Button -->
        <button @click="showModal = false"
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold">
          &times;
        </button>

        <!-- Modal Header -->
        <h2 class="text-2xl font-semibold text-gray-800">Update Product</h2>

        <!-- Alert Message -->
        <h3 id="alert-message" class="text-green-500 font-semibold italic text-lg"></h3>

        <!-- Form -->
        <form @submit.prevent="updateItem()" class="space-y-6">
          <!-- Basic Info -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Product Name *</label>
                <input v-model="form.productName" type="text" required placeholder="Enter product name"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Brand</label>
                <input v-model="form.brand" type="text" required placeholder="Enter brand name"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Category *</label>
                <select v-model="form.category" required
                        class="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                  <option disabled value="">Select category</option>
                  <option value="FishingClothing">FishingClothing</option>
                  <option value="FishingChairs">FishingChairs</option>
                  <option value="FishingWadersBoots">FishingWaders & Boots</option>
                  <option value="FishingLine">FlyFishingLine</option>
                  <option value="FishingReel">FishingReel</option>
                  <option value="FishingLures">FishingLures</option>
                  <option value="FishingBundles">FishingBundles</option>
                  <option value="FishingTools">FishingTools</option>
                  <option value="FishingPolesWhips">PolesWhips</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Price *</label>
                <input v-model="form.price" type="number" step="0.01" min="0" required placeholder="0.00"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <input v-model="form.pro_id" type="text" required value="${{item.pro_id}}"
                       class=" w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea v-model="form.description" rows="4" placeholder="Detailed product description..."
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"></textarea>
            </div>
          </div>

          <!-- Stock and Length -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Pricing & Inventory</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Stock *</label>
                <input v-model="form.stock" type="number" min="0" required placeholder="0"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Length</label>
                <input v-model="form.length" type="number" step="0.1" min="0" placeholder="0.0"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
            </div>
          </div>

          <!-- Thumbnail & Color -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Product Specs</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Thumbnail</label>
                <input type="file" @change="handleFileUpload"
                       class="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Color</label>
                <input v-model="form.color" type="text" placeholder="Black, Blue, Red"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false"
                    class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const items = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost/ApplicationBackend/api/middleware/api_fecth.php')
    const json = await res.json()

    // console.log(json)
    if (json.status && Array.isArray(json.data)) {
      items.value = json.data.map(item => ({
        ...item,
        isFavorite: false // optional default flag
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
// for modal

const showModal = ref(false)

const form = ref({
  pro_id: '',
  productName: '',
  brand: '',
  category: '',
  price: '',
  description: '',
  stock: '',
  length: '',
  color: ''
})
const handleFileUpload = (event) => {
  form.value.file = event.target.files[0];
};
// Open modal and set product ID
function openModal(proId) {
  form.value.pro_id = proId
  showModal.value = true
}

// Update item
async function updateItem() {
  try {
    const response = await fetch(`http://localhost/ApplicationBackend/api/middleware/updateApi.php?${form.value.pro_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    const result = await response.json()

    if( result){
      console.log(result)
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'The product has been successfully added!'
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
    showModal.value = false
  } catch (error) {
    console.error('Update failed:', error)
  }
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