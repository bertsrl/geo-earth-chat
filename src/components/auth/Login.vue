<template>
  <div class="login container">
      <form @submit.prevent="login" class="card-panel">
          <h2 class="center deep-purple-text">Login</h2>
           <div class="field">
              <label for="email">Email:</label>
              <input type="email" name="email" v-model="email"/>
          </div>
          <div class="field">
              <label for="password">Password:</label>
              <input type="password" name="password" v-model="password"/>
          </div>
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
          <div class="field">
              <button class="btn deep-purple">Login</button>
          </div>
      </form>
  </div>
</template>

<script>
import {auth, db} from "@/firebaseInit"

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            feedback: null 
        }
    },
    methods: {
        login() {
            if(this.email && this.password) {
                auth.signInWithEmailAndPassword(this.email, this.password)
                .then((cred) => {
                    this.$router.push({ name: 'GMap' })
                })
                .catch(err => {
                    this.feedback = err.message
                })                
                this.feedback = null
            } else {
                this.feedback = "Please fill in both fields"
            }
        }
    }
}
</script>

<style lang="sass">
    .login
        max-width: 400px
        margin-top: 60px
        h2
            font-size: 2.4em
        .field
            margin-bottom: 16px

</style>