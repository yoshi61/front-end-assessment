<template>
    <v-app>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: "Master",

        data: () => ({
            drawer: null
        }),
    }
</script>

<style scoped>

</style>
