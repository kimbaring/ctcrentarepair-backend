<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {local,openToast} from '@/functions.js';
import router from '@/router';

export default ({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data(){
    return{
      loginPaths: [
        "/home",
        "/register",
        "/registercustomer",
        "/registertechnician",
        "/registerridesharer",
        "/registertowCompany",
        "/login",
        "/verify-email",
        "/forgotpassword",
        "/register"
      ]
    };
  },

  created(){
    this.routeChanged(this.$route.path);
  },

  methods:{
    routeChanged(to){
      if(!local.isset('user_token')){
        if(this.loginPaths.includes(to)) return;
        router.replace('/login');
        openToast("You must be signed in!", 'danger');
      }else{
         if(this.loginPaths.includes(to)) {
          switch(local.getObject('user_info').role){
            case 'Customer': router.replace('/customer/dashboard'); break;
            case 'Technician': router.replace('/technician/dashboard'); break;
            case 'Tow Truck Operator': router.replace('/comingsoon'); break;
            case 'Ride Sharer': router.replace('/comingsoon'); break;
          }
          openToast("Please log out properly!", 'danger');
        }

        if(local.getObject('user_info').role == 'Customer' && this.$route.path.split('/')[1] != 'customer') router.replace('/customer/dashboard');
        else if(local.getObject('user_info').role == 'Technician' && this.$route.path.split('/')[1] != 'technician') router.replace('/technician/dashboard');
        else if(local.getObject('user_info').role == 'Tow Truck Operator' && this.$route.path.split('/')[1] != 'tow') router.replace('/comingsoon');
        else if(local.getObject('user_info').role == 'Ride Sharer' && this.$route.path.split('/')[1] != 'ridesharer') router.replace('/comingsoon');
      }
    }
  },

  watch:{
    $route (to){
      this.routeChanged(to.path);
    }
  }
});
</script>