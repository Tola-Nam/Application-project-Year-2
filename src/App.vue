<template>
<!--  <Register/>-->
    <sidebar/>
</template>

<script>
import AdminSidebar from "./components/AdminSidebar.vue";
import Register  from "./views/Register.vue";
export default {
  components: {
    sidebar: AdminSidebar,
    Register: Register,
  }
};
</script>
