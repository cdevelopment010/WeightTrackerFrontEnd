<template>
    <h1>Login</h1>

    <form ref="formRef" @submit.prevent="handleSubmit">
        <div>
            <label>Email:</label>
            <input type="email" required v-model="email">
        </div>
        <div>
            <label>Password:</label>
            <input type="password" required v-model="password">
        </div>

        <button>Log in</button>

    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../Services/WeightService";
import { useRouter } from "vue-router";

const router = useRouter(); 

const email = ref<string>(""); 
const password = ref<string>(""); 
const formRef = ref<HTMLFormElement>()

const handleSubmit = async () => {

    try { 
        if (!email.value || !password.value) { 
            throw new Error("Missing email or password");
        }

        const response = await login({email: email.value, password: password.value}); 
        localStorage.setItem("weighttracker-token", response.token);
        router.push("/");        

    } catch (err) {

    } finally {
        formRef.value?.reset();
        email.value = ""; 
        password.value = ""; 

    }

}

</script>