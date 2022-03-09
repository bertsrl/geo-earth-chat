<template>
  <div class="map">
      <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import {auth, db} from '@/firebaseInit' 
export default {
    name: 'GMap',
    data() {
        return {
            lat: 53,
            lng: -2
        }
    },
    methods: {
        renderMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })

            db.collection('users').get().then(users => {
                users.docs.forEach(doc => {
                    let data = doc.data()
                    if(data.geolocation) {
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        //add click event to marker
                        marker.addListener('click', () => {
                            this.$router.push({name: 'ViewProfile', params: { id: doc.id}})
                        })
                    }
                })
            })
        }
    },
    mounted() {
        let user = auth.currentUser

        //get user geolocation
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                //find the user record and then update geocoords
                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                    })
                }).then(() => {
                    this.renderMap()
                })

                this.renderMap()
            }, (err) => {
                console.log(err)
                this.renderMap()
            }, { maximumAge: 60000, timeout: 3000 })
        } else {
            //position centre by default values
            this.renderMap()
        }
    }
}
</script>

<style lang="sass">
    .google-map
        width: 100% !important
        height: 100% !important
        margin: 0 auto !important
        background: #fff !important
        position: fixed !important
        z-index: -1 !important
</style>