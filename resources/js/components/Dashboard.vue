<template>
    <div>
        kokokokokokokokokokokokokokokokok
    </div>
</template>

<script>
    export default {
        name:'dashboard',

        data: () => ({

        }),

        computed: {

        },

        methods:{

        },

        mounted: function() {
            // set current application year
            this.$store.dispatch('zomatoApis/searchForRestaurants')
                .then(response => {
                    console.log("kokokokokokokokokokokokokokokokokkokokoookokokokokokok");
                    console.log(response.data);
                })
                .catch( error =>{
                    console.log("popopopopopopopopopopopopopopopopopopopopo");
                    console.log(error);
                });
        }

    }
</script>

<style>
</style>