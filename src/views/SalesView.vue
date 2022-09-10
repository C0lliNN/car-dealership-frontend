<template>
  <main>
    <h2>Sales</h2>
    <v-row>
      <v-col cols="9" class="mx-auto">
        <v-data-table
          class="mt-10 elevation-1"
          :headers="headers"
          :items="sales"
          item-key="id"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Registered Sales</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="850px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Sale
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">New Sale</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <h4>General Information</h4>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="newSale.carId"
                            :items="vehicles"
                            label="Vehicle"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="newSale.sellerId"
                            :items="sellers"
                            label="Seller"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="newSale.customerName"
                            label="Customer Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="email"
                            v-model="newSale.customerPhone"
                            label="Customer Phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model.number="newSale.price"
                            label="Price (cents)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="date"
                            v-model="newSale.date"
                            label="Date"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDetails" max-width="850px">
                <v-card>
                  <v-card-title class="text-h5">Sale Details</v-card-title>
                  <v-card-text>
                    <v-row class="text-left mt-3">
                      <v-col cols="12" sm="6">
                        <p><strong>Date:</strong> {{ selectedSale?.date }}</p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p><strong>Price:</strong> {{ selectedSale?.price }}</p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Customer Name:</strong>
                          {{ selectedSale?.customer.name }}
                          >
                        </p></v-col
                      >
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Customer Email:</strong>
                          {{ selectedSale?.customer.email }}
                        </p></v-col
                      >
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Customer Phone:</strong>
                          {{ selectedSale?.customer.phone }}
                        </p></v-col
                      >
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Seller Name:</strong>
                          {{ selectedSale?.seller.name }}
                        </p></v-col
                      >
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Seller Email:</strong>
                          {{ selectedSale?.seller.email }}
                        </p></v-col
                      >
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Car Name:</strong>
                          {{ selectedSale?.car.name }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Car Brand:</strong>
                          {{ selectedSale?.car.brand }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Car Acquisition Date:</strong>
                          {{ selectedSale?.car.acquisition.date }}
                        </p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p>
                          <strong>Car Acquisition Price:</strong>
                          {{ selectedSale?.car.acquisition.price }}
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDetails"
                      >Close</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showSale(item)">
              mdi-dots-vertical
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </main>
</template>

<script>
import {
  getSellers,
  getSales,
  getVehicles,
  createSale
} from '../services/api.js';
export default {
  name: 'SellersView',
  data() {
    return {
      sales: [],
      sellers: [],
      vehicles: [],
      headers: [
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Sale Price',
          value: 'price'
        },
        {
          text: 'Customer Name',
          value: 'customer.name'
        },
        {
          text: 'Seller Name',
          value: 'seller.name'
        },
        {
          text: 'Profit',
          value: 'profit'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      dialog: false,
      dialogDetails: false,
      selectedSale: null,
      newSale: {
        carId: '',
        sellerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        price: 0,
        date: ''
      },
      defaultSale: {
        carId: '',
        sellerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        price: 0,
        date: ''
      }
    };
  },
  async created() {
    try {
      const sellers = await getSellers();
      this.sellers = sellers.map((seller) => ({
        text: seller.name,
        value: seller.id
      }));

      const vehicles = await getVehicles();
      this.vehicles = vehicles.map((vehicle) => ({
        text: vehicle.name,
        value: vehicle.id
      }));

      const sales = await getSales();
      this.sales = sales;
    } catch (e) {
      alert(e);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    showSale(sale) {
      console.log(sale);
      this.selectedSale = sale;
      this.dialogDetails = true;
    },
    closeDetails() {
      this.selectedSale = null;
      this.dialogDetails = false;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.newSale = Object.assign({}, this.defaultSale);
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        await createSale(this.newSale);
        const sales = await getSales();
        this.sales = sales;

        this.close();
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
