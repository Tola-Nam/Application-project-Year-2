<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h5 class="footer-heading">Info</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white footer-link">Formats</a></li>
            <li><a href="#" class="text-white footer-link">Compression</a></li>
            <li><a href="#" class="text-white footer-link">Pricing</a></li>
            <li><a href="#" class="text-white footer-link">FAQ</a></li>
            <li><a href="#" class="text-white footer-link">Status</a></li>
            <li><a href="#" class="text-white footer-link">Policy</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="footer-heading">Getting Started</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white footer-link">Introduction</a></li>
            <li><a href="#" class="text-white footer-link">Themes</a></li>
            <li><a href="#" class="text-white footer-link">Documentation</a></li>
            <li><a href="#" class="text-white footer-link">Usages</a></li>
            <li><a href="#" class="text-white footer-link">Elements</a></li>
            <li><a href="#" class="text-white footer-link">Global</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="footer-heading">Resources</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white footer-link">API</a></li>
            <li><a href="#" class="text-white footer-link">Form Validation</a></li>
            <li><a href="#" class="text-white footer-link">Accessibility</a></li>
            <li><a href="#" class="text-white footer-link">Marketplace</a></li>
            <li><a href="#" class="text-white footer-link">Visibility</a></li>
            <li><a href="#" class="text-white footer-link">Community</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="footer-heading">Newsletter</h5>
          <p>Subscribe to our newsletter for a weekly dose of news, updates, helpful tips, and exclusive offers.</p>
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Your email" />
            <button class="btn btn-light" type="button">SUBSCRIBE</button>
          </div>
          <div class="social-icons mt-3">
            <a href="#" class="text-white me-3 footer-social-icon"><i class="fab fa-facebook"></i></a>
            <a href="#" class="text-white me-3 footer-social-icon"><i class="fab fa-github"></i></a>
            <a href="#" class="text-white me-3 footer-social-icon"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="text-white footer-social-icon"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <p class="mb-0">© 2025 My Vue App | All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>
<style scoped>
footer {
  width: 100%;
  position: absolute;
  background-color: #0b1622;
}

.footer-heading {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 15px;
  color: #f39c12;
}

.footer-link {
  color: #bbb;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #f39c12;
}

.social-icons a {
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #f39c12;
}

.footer-social-icon {
  font-size: 1.5rem;
  color: #bbb;
}

.footer-social-icon:hover {
  color: #f39c12;
}
text{
  color: white;
  list-style: none;
}
/* Styling the subscribe button */
.input-group button {
  background-color: #f39c12;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input-group button:hover {
  background-color: #e67e22;
}

/* Responsive Footer */
@media (max-width: 768px) {
  footer {
    padding: 30px 0;
  }

  .container {
    padding-left: 15px;
    padding-right: 15px;
  }

  .footer-heading {
    font-size: 1.1rem;
  }

  .social-icons a {
    font-size: 1.3rem;
  }
}
a{
  text-decoration: none;
  color: white;
}
</style>
