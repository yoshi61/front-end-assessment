<template>
    <v-container class="fill-height pa-0">

        <!--   filters bar   -->
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="secondary"
                light
                :height="200"
        >
            <v-row class="px-4">
                <v-col cols="8">
                    <v-row no-gutters>
                        <v-col cols="3">
                            <v-row no-gutters>
                                <v-col class="subtitle-2 font-weight-bold">CATEGORY</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col
                                        cols="12"
                                        :key="'category-' + category.id"
                                        v-for="category in categories"
                                >
                                    <v-checkbox
                                            v-model="category.value"
                                            :label="category.name"
                                            hide-details
                                            @change="updateCategory($event, category)"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="9">
                            <v-row no-gutters>
                                <v-col class="subtitle-2 font-weight-bold">CUISINE</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col
                                        cols="4"
                                        :key="'cuisine-' + cuisine.cuisine_id"
                                        v-for="cuisine in cuisines"
                                >
                                    <v-checkbox
                                            v-model="cuisine.value"
                                            :label="cuisine.cuisine_name"
                                            hide-details
                                            @change="updateCuisine($event, cuisine)"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="4">
                    <v-row no-gutters>
                        <v-col cols="12" class="subtitle-2 font-weight-bold">
                            RATING
                        </v-col>
                        <v-col cols="12">
                            <v-range-slider
                                    :tick-labels="ratings"
                                    :value="[0, 4]"
                                    min="0"
                                    max="4"
                                    hide-details
                                    color="accent"
                            >
                            </v-range-slider>
                        </v-col>
                        <v-col cols="12" class="subtitle-2 font-weight-bold pt-4">
                            COST
                        </v-col>
                        <v-col cols="12">
                            <v-range-slider
                                    :tick-labels="prices"
                                    :value="[0, 3]"
                                    min="0"
                                    max="3"
                                    hide-details
                                    color="accent"
                            >
                            </v-range-slider>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-app-bar>

        <!--   results drawer   -->
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
                :width="500"
                class="primary"
        >
            <template v-slot:prepend>
                <v-list-item
                        class="text-center"
                >
                    <v-list-item-content class="text-center">
                        <v-list-item-title class="subtitle-2 font-weight-bold">
                            RESULTS
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-progress-linear
                        :active="loading"
                        indeterminate
                        absolute
                        color="accent"
                ></v-progress-linear>
            </template>

            <v-list dense class="pt-0">
                <v-list-item-group v-model="selected_index" color="accent">

                    <template v-for="item in api_results.restaurants">
                        <v-divider></v-divider>
                        <v-list-item
                                :key="item.restaurant.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.restaurant.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>

        <!--    restaurant details    -->
<!--   TODO restaurant details     -->
        <v-container class="primaryLight fill-height" fluid>
            <transition name="fade" mode="out-in">
                <v-card class="elevation-0 primaryLight">
                    <v-card-title>Restaurant A</v-card-title>
                    {{ this.api_results.restaurants[this.selected_index] }}
                </v-card>
            </transition>
        </v-container>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import config from'../app-config';

    export default {
        name:'dashboard',

        data: () => ({
            drawer:true,

            categories: [
                {
                    id: 1,
                    name: "Delivery",
                    value: false
                },
                {
                    id: 2,
                    name: "Dine-out",
                    value: false
                },
                {
                    id: 5,
                    name: "Takeaway",
                    value: false
                },
                {
                    id: 11,
                    name: "Pubs & Bars",
                    value: false
                }
            ],

            cuisines: [
                {
                    cuisine_id: 30,
                    cuisine_name: "Cafe Food",
                    value: false
                },
                {
                    cuisine_id: 161,
                    cuisine_name: "Coffee and Tea",
                    value: false
                },
                {
                    cuisine_id: 82,
                    cuisine_name: "Pizza",
                    value: false
                },
                {
                    cuisine_id: 40,
                    cuisine_name: "Fast Food",
                    value: false
                },
                {
                    cuisine_id: 3,
                    cuisine_name: "Asian",
                    value: false
                },
                {
                    cuisine_id: 5,
                    cuisine_name: "Bakery",
                    value: false
                },
                {
                    cuisine_id: 55,
                    cuisine_name: "Italian",
                    value: false
                },
                {
                    cuisine_id: 304,
                    cuisine_name: "Sandwich",
                    value: false
                },
                {
                    cuisine_id: 25,
                    cuisine_name: "Chinese",
                    value: false
                },
                {
                    cuisine_id: 983,
                    cuisine_name: "Pub Food",
                    value: false
                },
                {
                    cuisine_id: 1,
                    cuisine_name: "Other",
                    value: false
                }
            ],

            filters: {
                cuisines: [],
                categories: [],
                lat: null,
                lon: null,
            },

            ratings: [
                '1',
                '',
                '',
                '',
                '5',
            ],

            prices: [
                '$',
                '',
                '',
                '$$$$',
            ],

            selected_index: 0,

            loading: false,
        }),

        watch: {
            filters: {
                deep: true,
                handler(){
                    this.searchRestaurants();
                }
            }
        },

        computed: {
            ...mapGetters({
                api_results : 'zomatoApis/getResultSet',
            }),


            adelaide_geolocation: function(){
                return config.ADELAIDE_GEOLOCATION;
            },
        },

        methods: {
            searchRestaurants(){
                this.loading = true;
                this.$store.dispatch('zomatoApis/searchForRestaurants', this.filters)
                    .finally(()=>{
                        this.loading = false;
                    });
            },


            updateCategory(val, item){
                if(val){
                    this.filters.categories.push(item.id);
                    return;
                }

                const index = this.filters.categories.indexOf(item.id);
                if (index > -1) {
                    this.filters.categories.splice(index, 1);
                }
            },


            updateCuisine(val, item){
                if(val){
                    this.filters.cuisines.push(item.cuisine_id);
                    return;
                }

                const index = this.filters.cuisines.indexOf(item.cuisine_id);
                if (index > -1) {
                    this.filters.cuisines.splice(index, 1);
                }
            },

            setDefaultLocation() {
                this.filters.lat = this.adelaide_geolocation.latitude;
                this.filters.lon = this.adelaide_geolocation.longitude;
            },

            setLocation(position) {
                this.filters.lat = position.coords.latitude;
                this.filters.lon = position.coords.longitude;
            },

            setCurrentLocation() {

                // if not https, use default location
                if (location.protocol !== 'https:') {
                    this.setDefaultLocation();
                    return;
                }

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.setLocation);
                } else {
                    this.setDefaultLocation();
                    console.log("Geolocation is not supported by this browser.");
                }
            },

        },

        mounted: function() {

            // set current location for search
            this.setCurrentLocation();

            this.searchRestaurants();
        }

    }
</script>

<style>
</style>