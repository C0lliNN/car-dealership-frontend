<template>
  <main>
    <h1>Home Page</h1>
    <router-view to="/vehicles">Go to Vehicles</router-view>
  </main>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>
