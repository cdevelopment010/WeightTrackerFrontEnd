<template>
    <div class="component-container">
        <h3>Week on week comparison</h3>
        <div class="week-container">
            <span></span>
            <span>Count</span>
            <span>Weight (Kg)</span>
            <span>Body Fat (%)</span>
            <span>Muscle Mass (%)</span>
        </div>
        <hr />
        <div class="week-container week1">
            <span>Current week</span>
            <span>{{ thisWeek?.count }}</span>
            <span :class="{green: checkWeight, red: !checkWeight }">{{ (thisWeek?.weight ?? 0).toFixed(1) }}</span>
            <span :class="{green: checkBodyFat, red: !checkBodyFat }">{{ (thisWeek?.bodyFat ?? 0 ).toFixed(1) }}</span>
            <span :class="{green: checkMuscleMass, red: !checkMuscleMass }">{{ (thisWeek?.musclemass ?? 0).toFixed(1) }}</span>
        </div>
        <hr />
        <div class="week-container week0">
            <span>Previous week</span>
            <span>{{ lastWeek?.count }}</span>
            <span>{{ (lastWeek?.weight ?? 0).toFixed(1) }}</span>
            <span>{{ (lastWeek?.bodyFat ?? 0).toFixed(1) }}</span>
            <span>{{ (lastWeek?.musclemass ?? 0).toFixed(1) }}</span>
        </div>
        

    </div>
</template>

<script setup lang="ts">
import {  ref, watch } from 'vue';
import { getWeekComparison } from '../Services/WeightService';
import type { SummaryRecord } from '../Types/SummaryRecord';

const props = defineProps<{chartKey: number}>();
const thisWeek = ref<SummaryRecord>(); 
const lastWeek = ref<SummaryRecord>(); 

const checkWeight = ref<boolean>(false);
const checkBodyFat = ref<boolean>(false);
const checkMuscleMass = ref<boolean>(false);

watch(() => props.chartKey, async () => {
    await getData(); 
})

const getWeekRange = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay(); 
    const monday = new Date(d); 
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    monday.setDate(diff); 
    monday.setHours(0,0,0,0); 

    const sunday = new Date(monday); 
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999); 
    return { monday, sunday};
}

const getData = async () => {
    const _today = new Date(); 
    const _thisWeek = getWeekRange(_today);

    const _lastWeekDate = new Date(); 
    _lastWeekDate.setDate(_today.getDate() - 7); 
    const _lastWeek = getWeekRange(_lastWeekDate);

    thisWeek.value = await getWeekComparison(_thisWeek.monday, _thisWeek.sunday);
    lastWeek.value = await getWeekComparison(_lastWeek.monday, _lastWeek.sunday);

    console.log(thisWeek.value, lastWeek.value);

    checkWeight.value = (thisWeek.value?.weight ?? 0).toFixed(1) < (lastWeek.value?.weight ?? 0).toFixed(1)
    checkBodyFat.value = (thisWeek.value?.bodyFat ?? 0).toFixed(1) < (lastWeek.value?.bodyFat ?? 0).toFixed(1)
    checkMuscleMass.value = (thisWeek.value?.musclemass ?? 0).toFixed(1) > (lastWeek.value?.musclemass ?? 0).toFixed(1)
}

// onMounted(async () => {
//     await getData(); 
// })

</script>

<style scoped> 

.week-container { 
    display: grid; 
    grid-template-columns: 200px 1fr 1fr 1fr 1fr;
    gap: 20px; 
}

.green {color: green}
.red {color: red}
</style>