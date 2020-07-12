<template>
    <v-app-bar
                        :clipped-left="$vuetify.breakpoint.lgAndUp"
                        app
                        color="secondary"
                        light
                        :height="200"
                >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                    <v-toolbar-title
                            style="width: 300px"
                            class="ml-0 pl-4"
                    >
                        <span>ZOMATO</span>
                    </v-toolbar-title>
                </v-app-bar>
</template>

<script>
    export default {
        name:'filtersBar',

        data: () => ({}),

    }
</script>

<style>
</style>