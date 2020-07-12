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
            <v-row>
                <v-col cols="8">
                    <v-row no-gutters>
                        <v-col cols="3">
                            <v-row no-gutters>
                                <v-col>
                                    <div>CATEGORY</div>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col
                                        cols="12"
                                        :key="category.id"
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
                                <v-col>CUISINE</v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col
                                        cols="4"
                                        :key="cuisine.cuisine_id"
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
                <v-col cols="4"></v-col>
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
            <v-list-item
                    class="text-center"
            >
                <v-list-item-content class="text-center">
                    <v-list-item-title>
                        RESULTS
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense>
                <v-list-item-group v-model="items" color="accent">
                    <v-list-item
                            :key="item.restaurant.name"
                            v-for="item in items"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.restaurant.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!--    restaurant details    -->
        <v-container class="primaryLight fill-height" fluid>
            <transition name="fade" mode="out-in">
                <v-card class="elevation-0 primaryLight">
                    <v-card-title>Restaurant A</v-card-title>
                    {{ this.filters }}
                </v-card>
            </transition>
        </v-container>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

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
                    cuisine_id: 3,
                    cuisine_name: "Other",
                    value: false
                }
            ],

            filters: {
                cuisines: [],
                categories: [],
            },

            items: [
                { restaurant: {name: 'AAAAAAAAAAAAAAA'} },
                { restaurant: {name: 'bbbbbbbb'} },
                { restaurant: {name: 'ccccccc'} },
                { restaurant: {name: 'ddddddd'} },
                { restaurant: {name: 'eeeeeee'} },
                { restaurant: {name: 'fffffff'} },
                { restaurant: {name: 'ggggggg'} },
                { restaurant: {name: 'hhhhhhh'} },
            ],
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
            })
        },

        methods: {
            searchRestaurants(){
                this.$store.dispatch('zomatoApis/searchForRestaurants', {cuisines:[1,2,3]});
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
        },

        mounted: function() {
            this.searchRestaurants();
        }

    }
</script>

<style>
</style>