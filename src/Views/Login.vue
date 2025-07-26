<template>
    <div class="container">

        <div class="content-container">

            <h1>Login</h1>
        
            <form ref="formRef" @submit.prevent="handleSubmit">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" required v-model="email">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" required v-model="password">
                </div>
        
                <button class="btn">Log in</button>
        
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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

onMounted(() => {
    // const token = localStorage.getItem("weighttracker-token"); 
})

</script>

<style scoped> 

.container {
    margin: 0; 
    height: 100vh; 
    width: 100vw; 
    display: grid; 
    place-items: center;
    background-color: whitesmoke;
}

.content-container { 
    border: 1px solid rgb(233, 230, 230); 
    background: white; 
    padding: 2rem 2rem ; 
    border-radius: 5px; 
    text-align: center;
    box-shadow: 9px 7px 14px 1px #c9ced3ab;
}



form { 
    display: grid; 
    gap: 1rem;
}
button { justify-self: end; }

form > div { 
    display: flex; 
    flex-wrap: wrap;
    gap: 0.25rem;
}

form > div > label { 
    width: 75px;
    text-align: end;
}

@media screen and (max-width: 400px) {
    .content-container {
        margin: 30px;
        padding: 2rem 2rem ; 

    }
    form > div > label {
        text-align: start;
    } 
}
</style>