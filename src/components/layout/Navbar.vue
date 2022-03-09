<template>
<div class="navbar">
    <nav class="nav-extended deep-purple darken-1">
     <div class="container">
            <router-link :to="{ name: 'GMap' }" class="brand-logo left">Geo Earth Chat</router-link>
            <ul class="right">
                <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
                <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
                <li v-if="user"><a @click="logout">{{ user.email }}</a></li>
                <li v-if="user"><a @click="logout">Logout</a></li>
            </ul>
    </div>
    </nav>
</div>
</template>

<script>
import {auth, db} from '@/firebaseInit'
export default {
    name:'Navbar',
    data() {
        return {
            user: null,

        }
    },
    methods: {
        logout() {
            auth.signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        }
    },
    created() {
        //let user = auth.currentUser
        auth.onAuthStateChanged((user) => {
            if(user) {
                this.user = user
            } else {
                this.user = null
            }
        })
    }
}
</script>

<style lang="sass">
    #app
        text-align: left !important
    nav
        height: 100px !important
        padding-top: 30px !important
        position: relative !important
</style>