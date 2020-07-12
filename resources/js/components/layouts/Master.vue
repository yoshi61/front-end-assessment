<template>
    <v-app>
        <v-content class="primaryLight">
            <transition name="fade"  mode="out-in">
                <router-view></router-view>
            </transition>
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
