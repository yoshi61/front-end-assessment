<template>
    <div>
        <filters-bar></filters-bar>
        <results-drawer></results-drawer>
        <restaurant-details></restaurant-details>
    </div>
</template>

<script>
    import filtersBar from './FiltersBar';
    import resultsDrawer from './ResultsDrawer';
    import restaurantDetails from './RestaurantDetails';
    export default {
        name:'dashboard',

        components: {
            filtersBar,
            resultsDrawer,
            restaurantDetails
        },

        data: () => ({}),

    }
</script>

<style>
</style>