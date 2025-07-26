<template>
    <Nav />
    <div class="container">
        <WeightChart class="weight" :data="data" :chartKey="chartKey"/>
        <AddEntry class="add" @entry-added="refreshData"/>
        <BodyFatMuscleMass class="bodyfat" :data="data" :chartKey="chartKey" />
        <div class="component-container  recent">Recent entries</div>
        <div class="component-container  week">Week on Week comparison</div>
        <div class="component-container profile">Profile</div>
    </div>
</template>

<script setup lang="ts">
import Nav from '../components/Nav.vue';
import AddEntry from '../components/AddEntry.vue';
import WeightChart from '../components/WeightChart.vue';
import BodyFatMuscleMass from '../components/BodyFatMuscleMass.vue';
// import { testPing } from '../Services/WeightService';
import {ref } from "vue";
import { onMounted } from 'vue';
import { getWeightEntries } from '../Services/WeightService';

const chartKey = ref<number>(0); 
const data = ref<any>(); 

const refreshData = async () => {
    const dataRaw = await getWeightEntries();
    data.value = dataRaw;
    chartKey.value++; 
}

onMounted(async () => {
    const dataRaw = await getWeightEntries();
    data.value = dataRaw;
    chartKey.value++;
    console.log(chartKey.value)
})
</script>

<style scoped> 

    .container { 
        margin: 50px 120px; 
        display: grid; 
        grid-template-areas: 
            "weight weight weight weight weight weight weight weight add add add add"
            "weight weight weight weight weight weight weight weight recent recent recent recent"
            "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat  recent recent recent recent"
            "bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat bodyfat  recent recent recent recent"
            "week week week week week week week week profile profile profile profile"
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