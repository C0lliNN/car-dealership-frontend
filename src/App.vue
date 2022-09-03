<template>
  <v-app id="app">
    <v-navigation-drawer permanent app class="light-blue lighten-5">
      <h1 class="mt-5 text-h5 font-weight-bold">Car Dealership</h1>
      <v-list dense nav class="mt-5">
        <v-list-item
          v-for="link in links"
          :key="link.title"
          link
          @click="$router.push(link.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app class="light-blue lighten-5 text-white py-3">
      <h4 class="mx-auto text-center">
        &copy; Car Dealership 2022 - All Rights Reserved
      </h4>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Vehicles', icon: 'mdi-car', route: '/vehicles' },
        { title: 'Sales', icon: 'mdi-basket', route: '/sales' },
        { title: 'Sellers', icon: 'mdi-account', route: '/sellers' }
      ]
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
