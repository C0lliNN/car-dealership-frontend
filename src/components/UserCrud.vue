<template>
  <v-main>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">User Crud</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="users"
          item-key="id"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: 'UserCrud',
  data: () => ({
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Localização', value: 'location' }
    ],
    users: [
      { id: 1, name: 'Raphael', location: 'Campos' },
      { id: 2, name: 'Fabricio', location: 'RJ' }
    ]
  })
};
</script>
