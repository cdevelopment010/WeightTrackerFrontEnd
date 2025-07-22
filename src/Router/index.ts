import { createRouter, createWebHistory } from "vue-router";

import Home from "../Views/Home.vue";
import SignIn from "../Views/SignIn.vue";
import Login from "../Views/Login.vue";
import Dashboard from "../Views/Dashboard.vue";
import AddWeight from "../Views/AddWeight.vue";

const router = createRouter({
    history: createWebHistory(), 
    routes: [
        {path: '/', name:'home', meta: {index: false}, component: Home},
        {path: '/sign-up', name:'signIn', meta: {index: false}, component: SignIn},
        {path: '/login', name:'login', meta: {index: false}, component: Login},
        {path: '/dashboard', name:'dashboard', meta: {index: false}, component: Dashboard},
        {path: '/add-weight', name:'addWeight', meta: {index: false}, component: AddWeight}
    ]
}); 

router.beforeEach((to, from, next) => {
    //check localstorage for token. delete if expired. 
    const token = localStorage.getItem("weighttracker-token"); 
    try { 
        if (token == null ) { return }
        const base64payload = token.split(".")[1];
        const payload = atob(base64payload); 
        const parsedToken = JSON.parse(payload); 
        if ( !parsedToken || !parsedToken.exp ) { 
            localStorage.removeItem("weighttracker-token") 
            return next("/login")
        }

        if (parsedToken.exp < Math.floor(Date.now() / 1000) ) { 
            localStorage.removeItem("weighttracker-token"); 
            return next("/login")
        }

        next(); 
    } catch (err) {
        console.error(err)
        next();
    }

})

export default router;