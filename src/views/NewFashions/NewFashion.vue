<template>
  <div class="container mx-auto p-4 max-w-7xl bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm mb-6 p-4">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search..."
                 class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            <span class="hidden sm:inline">Sort</span>
          </button>
          <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            <span class="hidden sm:inline">Filter</span>
          </button>
          <router-link to="Register" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span class="hidden sm:inline">Add Product</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Table Section -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <!-- Desktop Table -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOCK</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <input type="checkbox" v-model="selectedProducts" :value="product.id" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.pro_id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="`http://localhost/ApplicationBackend/api/${product.thumbnail}`" :alt="product.name" class="h-10 w-10 rounded-lg object-cover mr-3">
                <div class="max-w-[200px]">
                  <div class="text-sm font-medium text-gray-900 truncate overflow-hidden whitespace-nowrap">
                    {{ product.productName }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.category }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-red-500">{{ product.length }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">{{ product.stock }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-500">${{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center space-x-2">
                <button @click="deleteProduct(product.pro_id)" class="text-red-600 hover:text-red-900 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
                <button @click="openModal(product.pro_id)" class="text-blue-600 hover:text-blue-900 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile Card View -->
      <div class="lg:hidden">
        <div v-for="product in filteredProducts" :key="product.id" class="border-b border-gray-200 p-4 align-middle">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center">
              <input type="checkbox" v-model="selectedProducts" :value="product.id" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3">
              <img :src="`http://localhost/ApplicationBackend/api/${product.thumbnail}`" :alt="product.productName" class="h-12 w-12 rounded-lg object-cover mr-3">
              <div>
                <div class="max-w-[90px]">
                  <div class="text-sm font-medium text-gray-900 truncate overflow-hidden whitespace-nowrap">
                    {{ product.productName }}
                    <p class="text-sm text-gray-500">{{ product.category }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="deleteProduct(product.pro_id)" class="text-red-600 hover:text-red-900 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
              <button @click="openModal(product.pro_id)" class="text-blue-600 hover:text-blue-900 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span class="text-gray-500 block">Length</span>
              <span>{{ product.length }}</span>
            </div>
            <div>
              <span class="text-gray-500 block">Stock</span>
              <span class="text-gray-900 font-medium">{{ product.stock }}</span>
            </div>
            <div>
              <span class="text-gray-500 block">Price</span>
              <span class="text-gray-900 font-medium">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for update product -->
  <div class="p-6">
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
        <div v-if="alertMessage" :class="alertClass" class="p-3 rounded-md">
          {{ alertMessage }}
        </div>

        <!-- Form -->
        <form @submit.prevent="updateItem()" class="space-y-6">
          <!-- Basic Info -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Product ID *</label>
                <input v-model="form.pro_id" type="text" required placeholder="Enter product name"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Product Name *</label>
                <input v-model="form.productName" type="text" required placeholder="Enter product name"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Category *</label>
                <select v-model="form.category" required class="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                  <option disabled value="">Select category</option>
                  <option value="FishingClothing">Fishing Clothing</option>
                  <option value="FishingChairs">Fishing Chairs</option>
                  <option value="FishingWadersBoots">Fishing Waders & Boots</option>
                  <option value="FishingLine">Fly Fishing Line</option>
                  <option value="FishingReel">Fishing Reel</option>
                  <option value="FishingLures">Fishing Lures</option>
                  <option value="FishingBundles">Fishing Bundles</option>
                  <option value="FishingTools">Fishing Tools</option>
                  <option value="FishingPolesWhips">Poles & Whips</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Brand</label>
                <input v-model="form.brand" type="text" required placeholder="Enter brand name"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Price *</label>
                <input v-model="form.price" type="number" step="0.01" min="0" required placeholder="0.00"
                       class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Stock *</label>
                <input v-model="form.stock" type="number" min="0" required placeholder="0"
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea v-model="form.description" rows="4" placeholder="Detailed product description..."
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Thumbnail</label>
              <input type="file" @change="handleFileUpload" class="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none" />
            </div>
          </div>
          <div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Color</label>
                <input v-model="form.color" type="text" placeholder="Black, Blue, Red"
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Length</label>
                <input v-model="form.length" type="number" step="0.1" min="0" placeholder="0.0"
                  class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
              </div>
            </div>
          </div>
          <!-- Footer Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="showModal = false"
               class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded">Cancel</button>
            <button type="submit" :disabled="isUpdating"
               class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow disabled:opacity-50">
              {{ isUpdating ? 'Updating...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default {
  name: 'ProductTable',
  data() {
    return {
      searchQuery: '',
      selectAll: false,
      selectedProducts: [],
      products: [],

      // Modal control
      showModal: false,
      isUpdating: false,

      // Alert system
      alertMessage: '',
      alertClass: '',

      // Form data
      form: {
        pro_id: '',
        productName: '',
        brand: '',
        category: '',
        price: '',
        description: '',
        stock: '',
        length: '',
        color: '',
        thumbnail: null
      }
    }
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products

      return this.products.filter(product =>
          product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.price.toString().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    selectedProducts() {
      this.selectAll = this.selectedProducts.length === this.filteredProducts.length && this.filteredProducts.length > 0
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await fetch('http://localhost/ApplicationBackend/api/middleware/api_fecth.php')
        const json = await res.json()

        if (json.status && Array.isArray(json.data)) {
          this.products = json.data
        } else {
          console.error('Unexpected data structure:', json)
          this.showAlert('Failed to load products', 'error')
        }
      } catch (error) {
        console.error('Fetch error:', error)
        this.showAlert('Error loading products', 'error')
      }
    },

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedProducts = this.filteredProducts.map(p => p.id)
      } else {
        this.selectedProducts = []
      }
    },
    async deleteProduct(pro_id) {
      // alert(pro_id);
      if (confirm(`Are you sure you want to delete this product?`)) {
        try {
          const response = await fetch(`http://localhost/ApplicationBackend/api/middleware/deleted_api.php?pro_id=${pro_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const result = await response.json();

          if (result.status) {
            this.showAlert('Product deleted successfully', 'success');
            Swal.fire('Deleted!', 'Product deleted successfully.', 'success');
            this.fetchProducts(); // Reload product list
          } else {
            Swal.fire('Failed!', 'Failed to delete product.', 'error');
            this.showAlert(result.message || 'Failed to delete product', 'error');
          }
        } catch (error) {
          console.error('Delete error:', error);
          this.showAlert('Error deleting product', 'error');
        }
      }
    },
    openModal(proId) {
      // alert(proId);
      const product = this.products.find(p => p.pro_id === proId)
      if (product) {
        this.form = {
          ...product,
          thumbnail: null // Reset file input
        }
        this.showModal = true
        this.alertMessage = ''
      } else {
        console.warn('Product not found with ID:', proId)
      }
    },

    handleFileUpload(event) {
      this.form.thumbnail = event.target.files[0]
    },

    async updateItem() {
      this.isUpdating = true

      const formData = new FormData()
      formData.append('pro_id', this.form.pro_id)
      formData.append('productName', this.form.productName)
      formData.append('brand', this.form.brand)
      formData.append('category', this.form.category)
      formData.append('price', this.form.price)
      formData.append('description', this.form.description)
      formData.append('stock', this.form.stock)
      formData.append('length', this.form.length)
      formData.append('color', this.form.color)

      if (this.form.thumbnail) {
        formData.append('thumbnail', this.form.thumbnail)
      }

      try {
        const response = await fetch('http://localhost/ApplicationBackend/api/middleware/updateApi.php', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (result.status) {
          this.showAlert('Product updated successfully!', 'success')
          this.fetchProducts() // Refresh the product list
          setTimeout(() => {
            this.showModal = false
            this.alertMessage = ''
          }, 1500)
        } else {
          this.showAlert(result.message || 'Update failed', 'error')
        }
      } catch (error) {
        console.error('Update failed:', error)
        this.showAlert('Update failed due to network error', 'error')
      } finally {
        this.isUpdating = false
      }
    },

    showAlert(message, type) {
      this.alertMessage = message
      this.alertClass = type === 'success'
          ? 'text-green-700 bg-green-100 border border-green-300'
          : 'text-red-700 bg-red-100 border border-red-300'

      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.alertMessage = ''
      }, 3000)
    }
  }
}
</script>