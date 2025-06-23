<template>
  <div class="product-form">
    <div class="form-container">
      <h2 class="form-title">Add New Product</h2>

      <form @submit.prevent="submitForm" class="form">
        <!-- Basic Product Information -->
        <div class="form-section">
          <h3 class="section-title">Basic Information</h3>
          <h3 class=" text-green-400 text-xxl rounded-2xl fw-bold fst-italic" id="alert-message"></h3>
          <div class="form-row">
            <div class="form-group">
              <label for="productName">Product Name *</label>
              <input id="productName" v-model="form.productName" type="text" required class="form-input" placeholder="Enter product name"/>
            </div>

            <div class="form-group">
              <label for="sku">Brand</label>
              <input id="sku" v-model="form.brand" type="text" required class="form-input" placeholder="Enter brand name"/>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Category *</label>
              <select  id="category" v-model="form.category" required class="form-select text-grey-400 text-xl fw-bold fst-italic">
                <option value="Select category" disabled class="text-green-500">Select category</option>
                <option value="FishingClothing">FishingClothing</option>
                <option value="FishingChairs">FishingChairs</option>
                <option value="FishingWadersBoots">FishingWaders&Boots</option>
                <option value="FishingLine">FlyFishingLine</option>
                <option value="FishingReel">FishingReel</option>
                <option value="FishingLures">FishingLures</option>
                <option value="FishingBundles">FishingBundles</option>
                <option value="FishingTools">FishingTools</option>
                <option value="FishingPolesWhips">PolesWhips</option>
              </select>
            </div>
            <div class="form-group">
              <label for="price">Price *</label>
                <span class="prefix">$</span>
                <input id="price" v-model="form.price" type="number" step="0.01" min="0" required class="form-input" placeholder="0.00"/>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Product Description</label>
            <textarea id="description" v-model="form.description" class="form-textarea" rows="4" placeholder="Detailed product description..."></textarea>
          </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="form-section">
          <h3 class="section-title">Pricing & Inventory</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="quantity">Stock Quantity *</label>
              <input id="quantity" v-model="form.quantity" type="number" min="0" required class="form-input" placeholder="0"/>
            </div>

            <div class="form-group">
              <label for="length">Length</label>
                <input id="length" v-model="form.length" type="number" step="0.1" min="0" class="form-input" placeholder="0.0"/>
            </div>
          </div>
        </div>

        <!-- Product Specifications -->
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label for="material">Thumbnail</label>
              <input id="material" @change="handleFileUpload" type="file" class="form-input"/>
            </div>
            <div class="form-group">
              <label for="color">Color</label>
              <input id="color" v-model="form.color" type="text" class="form-input" placeholder="Black, Blue, Red"/>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  productName: '',
  brand: '',
  category: '',
  price: '',
  description: '',
  quantity: '',
  length: '',
  file: null,
  color: ''
});

const handleFileUpload = (event) => {
  form.value.file = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append('productName', form.value.productName);
  formData.append('brand', form.value.brand);
  formData.append('category', form.value.category);
  formData.append('price', form.value.price);
  formData.append('description', form.value.description);
  formData.append('quantity', form.value.quantity);
  formData.append('length', form.value.length);
  formData.append('photo', form.value.file);
  formData.append('color', form.value.color);

  const response = await fetch("http://localhost/ApplicationBackend/api/middleware/insert_api.php", {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log(result);
  // function for get message to url
  const params = new URLSearchParams(window.location.search);
  params.set("message","success");
  const newURL = `${window.location.pathname}?${params}`;
  history.pushState({},'',newURL);
  const message = params.get("message");

  if ( message === "success"){
    // alert(message);
    setTimeout(()=>{
      document.getElementById('alert-message').innerHTML = `product create ${message}`;
    },3000)
  }else {
    setTimeout(()=>{
      document.getElementById('alert-message').innerHTML = `product create is not ${message}`;
    },3000)
  }
};
</script>


<style scoped>
.product-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f6fa;
  min-height: 100vh;
}

.form-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 500;
  border-left: 4px solid #27ae60;
  padding-left: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #495057;
  font-size: 0.95rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #27ae60;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

.input-with-prefix,
.input-with-suffix {
  display: flex;
  align-items: center;
  position: relative;
}

.prefix {
  position: absolute;
  left: 12px;
  color: #6c757d;
  font-weight: 500;
  z-index: 1;
}

.suffix {
  position: absolute;
  right: 12px;
  color: #6c757d;
  font-weight: 500;
  z-index: 1;
}

.input-with-prefix input {
  padding-left: 30px;
}

.input-with-suffix input {
  padding-right: 40px;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: #27ae60;
}

.checkbox-label {
  cursor: pointer;
  color: #495057;
  font-size: 0.95rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #27ae60;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #229954;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
  transform: translateY(-1px);
}

.btn-draft {
  background-color: #f39c12;
  color: white;
}

.btn-draft:hover {
  background-color: #e67e22;
  transform: translateY(-1px);
}

.form-summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.summary-card {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #27ae60;
}

.stock {
  color: #6c757d;
  font-size: 0.9rem;
}

.summary-description {
  margin-top: 10px;
  color: #6c757d;
  font-size: 0.9rem;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-form {
    padding: 10px;
  }

  .form-container {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 15px;
  }

  .form-title {
    font-size: 1.3rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>