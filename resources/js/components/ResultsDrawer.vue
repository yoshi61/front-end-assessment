<template>
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
                <template v-for="item in items">
                    <v-list-item
                            :key="item.text"
                            link
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.restaurant.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
</template>

<script>
    export default {
        name:'resultsDrawer',

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
    }
</script>

<style>
</style>