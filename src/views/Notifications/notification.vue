<template>
  <div class="gradient-bg min-h-screen font-inter">
    <div class="min-h-screen py-8 px-4">
      <!-- Header -->
      <div class="max-w-4xl mx-auto text-center mb-12 slide-in">
<!--        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 neon-glow animate-pulse-slow">-->
<!--          <i class="fas fa-car-side text-white text-2xl"></i>-->
<!--        </div>-->
        <h1 class="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
          <span class="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SUPERCAR
          </span>
          REGISTRY
        </h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Add your premium automotive masterpiece to our exclusive collection
        </p>
      </div>

      <!-- Main Form -->
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="submitForm" class="glass-morphism rounded-3xl p-8 md:p-12 hover-lift slide-in" method="post">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Basic Information -->
            <div class="space-y-6">
              <h2 class="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
                <i class="fas fa-info-circle mr-3 text-blue-400"></i>
                Basic Information
              </h2>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">Brand</label>
                <input v-model="form.brand" type="text" placeholder="Ferrari, Lamborghini, McLaren..." name="brand"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white
                    placeholder-gray-400 focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
              </div>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">Model</label>
                <input v-model="form.model" type="text" placeholder="488 GTB, Huracán, 720S..." name="Model"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-gray-300 font-medium">Year</label>
                  <input v-model="form.year" type="number" min="1950" max="2025" placeholder="2024" name="year"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                      focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
                </div>
                <div class="space-y-2">
                  <label class="block text-gray-300 font-medium">Price ($)</label>
                  <input v-model="form.price" type="number" min="0" placeholder="500000" name="price"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                      focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium text-xs">Thumbnail</label>
                <div class="flex gap-3 items-center">
                  <!-- Styled File Input Wrapper -->
                  <label class="flex items-center justify-center w-20 h-[48px] rounded-xl border border-gray-600
                      bg-gray-800 cursor-pointer hover:bg-gray-700 transition">
                    <input type="file" class="hidden" name="thumbnail"/>
                    <span class="text-sm text-gray-300">Choose</span>
                  </label>

                  <!-- Text Input -->
                  <input v-model="form.colorName" type="text" placeholder="Rosso Corsa, Verde Mantis..." name="color"
                      class="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required/>
                </div>
              </div>
            </div>

            <!-- Technical Specifications -->
            <div class="space-y-6">
              <h2 class="font-orbitron text-2xl font-bold text-white mb-6 flex items-center">
                <i class="fas fa-cogs mr-3 text-purple-400"></i>
                Specifications
              </h2>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">Engine</label>
                <input v-model="form.engine" type="text" placeholder="V12 6.5L Twin-Turbo" name="engine"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-gray-300 font-medium">Horsepower</label>
                  <input v-model="form.horsepower" type="number" min="0" placeholder="720" name="HorsePower"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                       focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
                </div>
                <div class="space-y-2">
                  <label class="block text-gray-300 font-medium text-xs">Top Speed (mph)</label>
                  <input v-model="form.topSpeed" type="number" min="0" placeholder="217" name="TopSpeed"
                         class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                       focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">0-60 mph (seconds)</label>
                <input v-model="form.acceleration" type="number" step="0.1" min="0" placeholder="2.8" name="seconds"
                       class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
              </div>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">Transmission</label>
                <select v-model="form.transmission" class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" name="transmission" required>
                  <option value="" disabled>Select transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="semi-automatic">Semi-Automatic</option>
                  <option value="dual-clutch">Dual-Clutch</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-gray-300 font-medium">Drive Type</label>
                <select v-model="form.driveType" name="driveType"
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white
                    focus:border-blue-500 focus:outline-none input-glow transition-all duration-300" required>
                  <option value="" disabled>Select drive type</option>
                  <option value="rwd">Rear-Wheel Drive</option>
                  <option value="awd">All-Wheel Drive</option>
                  <option value="fwd">Front-Wheel Drive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-8 space-y-2">
            <label class="block text-gray-300 font-medium">Description</label>
            <textarea v-model="form.description" rows="4" name="description"
                      placeholder="Describe the unique features, history, or special characteristics of this supercar..."
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400
                focus:border-blue-500 focus:outline-none input-glow transition-all duration-300 resize-none">
            </textarea>
          </div>

          <!-- Features -->
          <div class="mt-8">
            <label class="block text-gray-300 font-medium mb-4">Premium Features</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label v-for="feature in availableFeatures" :key="feature" class="flex items-center space-x-3 cursor-pointer">
                <input v-model="form.features" :value="feature" type="checkbox" name="PremiumFeatures"
                       class="w-5 h-5 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2">
                <span class="text-gray-300 text-sm">{{ feature }}</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-12 text-center">
            <button type="submit" :disabled="isSubmitting"
                    class="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-orbitron
                font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                neon-glow disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fas fa-rocket mr-3"></i>
              <span v-if="!isSubmitting">REGISTER SUPERCAR</span>
              <span v-else>PROCESSING...</span>
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-8 glass-morphism rounded-2xl p-6 text-center slide-in">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 neon-glow">
            <i class="fas fa-check text-white text-2xl"></i>
          </div>
          <h3 class="font-orbitron text-2xl font-bold text-white mb-2">Registration Complete!</h3>
          <p class="text-gray-300">Your supercar has been successfully added to our exclusive registry.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  brand: '',
  model: '',
  year: '',
  price: '',
  color: '#ff0000',
  colorName: '',
  engine: '',
  horsepower: '',
  topSpeed: '',
  acceleration: '',
  transmission: '',
  driveType: '',
  description: '',
  features: []
})

// Available features for selection
const availableFeatures = ref([
  'Carbon Fiber Body',
  'Active Aerodynamics',
  'Launch Control',
  'Track Mode',
  'Premium Sound System',
  'Racing Seats',
  'Ceramic Brakes',
  'Adaptive Suspension',
  'Custom Paint',
  'Limited Edition',
  'Hybrid System',
  'Turbo/Supercharged'
])

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Form submission handler
const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Log form data (replace with actual API call)
    console.log('Supercar Data:', {
      ...form,
      priceFormatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(form.price)
    })

    // Show success message
    showSuccess.value = true

    // Reset form after 3 seconds
    setTimeout(() => {
      resetForm()
      showSuccess.value = false
    }, 3000)

  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form function
const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (Array.isArray(form[key])) {
      form[key] = []
    } else if (key === 'color') {
      form[key] = '#ff0000'
    } else {
      form[key] = ''
    }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

.font-orbitron {
  font-family: 'Orbitron', monospace;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.gradient-bg {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0f0f23 100%);
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.neon-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.input-glow:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1);
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>