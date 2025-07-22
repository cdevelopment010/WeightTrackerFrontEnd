<template>
    <h1>Sign up!</h1>

    <form ref="formRef" @submit.prevent="handleSubmit"> 
        <div>
            <label>Email:</label>
            <input type="email" required v-model="email">
        </div>
        <div>
            <label>Password:</label>
            <input type="password" required v-model="password">
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type="password" required v-model="confirmPassword">
        </div>

        <button>Sign up</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { signUp } from "../Services/WeightService";

const email = ref<string>(""); 
const password = ref<string>(""); 
const confirmPassword = ref<string>(""); 
const formRef = ref<HTMLFormElement>(); 


const handleSubmit = async () => {

    if (confirmPassword.value !== password.value) {
        throw new Error("Passwords do not match")
        return;
    }

    try {
        if (!email.value || !password.value ) { return }
        const response = await signUp({email: email.value, password: password.value}); 
        console.log(response)

        localStorage.setItem("weighttracker-token", response.token);

    } catch (err) {
        console.error(err);
    } finally {
        formRef.value?.reset(); 
    }

}

</script>