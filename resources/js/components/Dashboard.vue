<template>
    <v-container class="fill-height pa-0">

        <!--   filters bar   -->
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="secondary"
                light
                :height="200"
                class="elevation-0"
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
                ref="resultDrawer"
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

            <v-list dense class="pt-0" ref="resultList">
                <v-list-item-group v-model="selected_index" color="accent">

                    <template v-for="item in api_results.restaurants">
                        <v-divider></v-divider>
                        <v-list-item
                                :key="item.restaurant.id"
                                @click="setSelectedRestaurant(item)"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="pl-8">
                                    {{ item.restaurant.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                </v-list-item-group>
            </v-list>

            <!--   Load more loading   -->
            <div class="text-center my-2">
                <v-progress-circular
                        v-if="load_more_loading && !loading"
                        indeterminate
                        color="accent"
                ></v-progress-circular>
                <v-btn v-if="!load_more_loading && !loading" @click="loadMoreRestaurants" text>
                    LOAD MORE
                </v-btn>
            </div>

        </v-navigation-drawer>

        <!--    restaurant details    -->
        <v-container class="primaryLight fill-height" fluid>
            <v-row class="fill-height" justify="start" align="start">
                <v-col>
                    <transition name="fade" mode="out-in">
                        <v-card v-if="!!selected_restaurant" class="elevation-0 primaryLight">
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="auto">
                                        <v-spacer></v-spacer>
                                        <v-img
                                                height="400"
                                                width="400"
                                                :src="this.selected_restaurant.restaurant.thumb"
                                        ></v-img>
                                    </v-col>

                                    <v-col cols="12" md="4" lg="6" class="pl-0">
                                        <v-card-title>
                                            <h1>{{ this.selected_restaurant.restaurant.name }}</h1>
                                        </v-card-title>

                                        <v-card-subtitle class=" mt-1 caption grey--text">{{ this.selected_restaurant.restaurant.location.address }}</v-card-subtitle>

                                        <v-card-text>
                                            <v-row
                                                    align="center"
                                                    class="mx-0"
                                            >
                                                <v-rating
                                                        :value="parseFloat(selected_restaurant.restaurant.user_rating.aggregate_rating)"
                                                        color="amber"
                                                        dense
                                                        half-increments
                                                        readonly
                                                        size="20"
                                                ></v-rating>

                                                <div class="grey--text ml-4">{{ this.selected_restaurant.restaurant.user_rating.aggregate_rating }} ({{this.selected_restaurant.restaurant.user_rating.votes}})</div>
                                            </v-row>

                                            <div class="my-2 subtitle-1">
                                                {{priceToDollarMarks(this.selected_restaurant.restaurant.price_range)}} • {{this.selected_restaurant.restaurant.cuisines}}
                                            </div>

                                            <div>

                                                <v-chip-group column active-class="primary--text">
                                                    <v-chip
                                                            v-for="highlight in this.selected_restaurant.restaurant.highlights"
                                                            :key="highlight"
                                                    >{{highlight}}</v-chip>
                                                </v-chip-group>
                                            </div>

                                            <v-list-item two-line>
                                                <v-list-item-content class="pt-1 pb-0">
                                                    <v-list-item-title class="subtitle-2 font-weight-bold">PHONE NUMBER</v-list-item-title>
                                                    <v-list-item-subtitle class="title inner--text">{{this.selected_restaurant.restaurant.phone_numbers}}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>

                                            <v-list-item two-line>
                                                <v-list-item-content class="pt-1 pb-0">
                                                    <v-list-item-title class="subtitle-2 font-weight-bold">OPENING HOURS</v-list-item-title>
                                                    <v-list-item-subtitle class="title inner--text">{{this.selected_restaurant.restaurant.timings}}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>

                                        </v-card-text>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </transition>
                </v-col>
            </v-row>
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

            start: 0,

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

            selected_restaurant: null,

            loading: false,

            // infinite scrolls
            load_more_loading: false,
            bottom: false,
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

                // start loading
                this.loading = true;

                // reset offset
                this.start = 0;

                // get request
                this.$store.dispatch('zomatoApis/searchForRestaurants', this.filters)
                    .then(response => {
                        if(response.data.results_found > 0){

                            //set the first result to selected restaurant
                            this.selected_restaurant = JSON.parse(JSON.stringify(response.data.restaurants[0]));
                            this.selected_index = 0;

                            // update start offset
                            this.start = response.data.results_shown;
                        }
                    })
                    .catch( error =>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.loading = false;
                    });
            },

            loadMoreRestaurants(){

                // load more loading start
                this.load_more_loading = true;

                // prepare params
                let params = {
                    start: this.start,
                    cuisines: this.filters.cuisines,
                    categories: this.filters.categories,
                    lat: this.filters.lat,
                    lon: this.filters.lon,
                };

                // get request
                this.$store.dispatch('zomatoApis/loadMoreRestaurants', params)
                    .then(response => {
                        if(response.data.results_found > 0){

                            // update start offset
                            this.start += response.data.results_shown;
                        }
                    })
                    .catch( error =>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.load_more_loading = false;
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

            setSelectedRestaurant(item) {
                this.selected_restaurant = item;
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

                    // get and set user location
                    navigator.geolocation.getCurrentPosition(this.setLocation);
                } else {

                    // set default location
                    this.setDefaultLocation();
                    console.log("Geolocation is not supported by this browser.");
                }
            },

            priceToDollarMarks(val){
                let str = "$";
                return str.repeat(val);
            }

        },

        mounted: function() {

            // set current location for search
            this.setCurrentLocation();

            this.searchRestaurants();
        },
    }
</script>

<style>
</style>