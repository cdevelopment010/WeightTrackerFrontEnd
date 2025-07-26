<template>
    <Nav />
    <div class="container">
        <div class="component-container weight">Weight Graph</div>
        <AddEntry class=" add"/>
        <div class="component-container  bodyfat">Body Fat Graph</div>
        <div class="component-container  recent">Recent entries</div>
        <div class="component-container  week">Week on Week comparison</div>
        <div class="component-container profile">Profile</div>
    </div>
</template>

<script setup lang="ts">
import Nav from '../components/Nav.vue';
import AddEntry from '../components/AddEntry.vue';
// import { testPing } from '../Services/WeightService';
import { onMounted } from 'vue';

onMounted(async () => {
    // await testPing(); 
})
</script>

<style scoped> 

    .container { 
        margin: 50px 120px; 
        display: grid; 
        grid-template-areas: 
            "weight weight weight weight weight weight weight weight add add add add"
            "weight weight weight weight weight weight weight weight add add add add"
            "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat  recent recent recent recent"
            "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat  recent recent recent recent"
            "week week week week week week week week recent recent recent recent"
            "week week week week week week week week profile profile profile profile"
            
            ;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto;
        gap: 20px; 
    }

    .weight { grid-area: weight;}
    .add { grid-area: add;}
    .bodyfat { grid-area: bodyfat;}
    .recent { grid-area: recent;}
    .week { grid-area: week;}
    .profile {grid-area: profile}

    /* Laptop & tablet */
    @media screen and (max-width: 1024px) {
        .container { 
            margin: 50px 80px; 
            display: grid; 
            grid-template-areas: 
                "add add add add profile profile profile profile"
                "weight weight weight weight weight weight weight weight"
                "weight weight weight weight weight weight weight weight"
                "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat"
                "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat"
                "recent recent recent recent recent recent recent recent"
                "recent recent recent recent recent recent recent recent"
                "week week week week week week week week"
                
                ;
            grid-template-columns: repeat(8, 1fr);
            gap: 20px; 
        }
    }

    /* phone */
    @media screen and (max-width: 600px) {
        .container { 
            margin: 50px 30px; 
            display: grid; 
            grid-template-areas: 
                "profile "
                "add "
                "weight "
                "weight "
                "bodyfat "
                "bodyfat "
                "recent "
                "recent "
                "week"
                
                ;
            grid-template-columns: 1fr;
            gap: 20px; 
        }
    }
</style>