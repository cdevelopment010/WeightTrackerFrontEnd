<template>
    <div class="component-container">
        <h2>Add Entry</h2>
        <form ref="formRef" class="form-grid" @submit.prevent="handleAddEntry">
            <div class="form-group">
                <label for="date-input">Date</label>
                <input type="date" v-model="dateRef" id="date-input" required>

            </div>
            <div class="form-group">
                <label for="weight-input">Weight</label>
                <input type="number" v-model="weightRef" id="weight-input" required min="0" step="0.1">
            </div>
            <div class="form-group">
                <label for="bodyfat-input">Body Fat</label>
                <input type="number" v-model="bodyFatRef" id="bodyfat-input" min="0" max="100" step="0.1">
            </div>
            <div class="form-group">
                <label for="musclemass-input">Muscle Mass</label>
                <input type="number" v-model="muscleMassRef" id="musclemass-input" min="0" max="100" step="0.1">
            </div>
            <button type="submit" class="btn form-btn">Add</button>
        </form>
    </div>

</template>

<script setup lang="ts">
import { ref} from "vue"; 
import { addWeightEntry } from "../Services/WeightService";

const dateRef = ref<string>(new Date().toISOString().split("T")[0]); 
const weightRef = ref<number>(0); 
const bodyFatRef = ref<number | null>(null); 
const muscleMassRef = ref<number | null>(null); 
const formRef = ref<HTMLFormElement>()

const handleAddEntry = async () => {
    let entry = {
        Date: dateRef.value,
        Weight: weightRef.value, 
        BodyFat: bodyFatRef.value ?? undefined, 
        MuscleMass: muscleMassRef.value ?? undefined
    }
    try {
        const response = await addWeightEntry(entry)
        console.log("add weight", response);
        if (formRef) { 
            formRef.value?.reset(); 
            muscleMassRef.value = null; 
            bodyFatRef.value = null; 
            weightRef.value = 0;
            dateRef.value = new Date().toISOString().split("T")[0]
        }

    } catch (err) {
        console.error(err);
    }

    
}


</script>

<style scoped>

h2 {
    margin-top:0; 
    text-align: center;
}
.form-grid {
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px; 
    align-items: end;
    margin: 0 auto;
}

.form-group { 
    display: flex; 
    flex-direction: column;
}

.form-btn { 
    grid-column: -1 / 1;
    justify-self: end;
}
input,
label {
  font-size: 0.95rem;
}

input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
</style>