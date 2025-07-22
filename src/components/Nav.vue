

<template>
    <nav>
        <RouterLink to="/sign-up" v-if="!isSignedIn">Sign up</RouterLink>
        <RouterLink to="/login" v-if="!isSignedIn">Login</RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const isSignedIn = ref<boolean>(); 


onMounted(() => {
    isSignedIn.value = localStorage.getItem("weighttracker-token") != null;
})

</script>