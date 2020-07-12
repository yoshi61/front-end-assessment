<template>
    <v-container class="fill-height pa-0">
        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="secondary"
                light
                :height="200"
        >
            <v-row>
                <v-col cols="8">
                    <v-row>
                        <v-col>

                        </v-col>
                        <v-col></v-col>
                        <v-col></v-col>
                        <v-col></v-col>
                    </v-row>
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-app-bar>


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
                <v-list-item-group v-model="item" color="accent">
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

        <v-container class="primaryLight fill-height" fluid>
            <transition name="fade" mode="out-in">
                <v-card class="elevation-0 primaryLight">
                    <v-card-title>Restaurant A</v-card-title>
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

        computed: {
            ...mapGetters({
                api_results : 'zomatoApis/getResultSet',
            })
        },

        mounted: function() {
            this.$store.dispatch('zomatoApis/searchForRestaurants', {cuisines:[1,2,3]})
                .finally(()=>{
                    console.log("kokokokokokokokokokokokokokokokokkokokoookokokokokokok");
                    console.log("kokokokokokokokokokokokokokokokokkokokoookokokokokokok");
                    console.log(this.api_results);
                    console.log("kokokokokokokokokokokokokokokokokkokokoookokokokokokok");
                    console.log("kokokokokokokokokokokokokokokokokkokokoookokokokokokok");
                });
        }

    }
</script>

<style>
</style>