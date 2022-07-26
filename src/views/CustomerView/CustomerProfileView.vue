<template>
<ion-page>
    <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <div class="section">
            <div class="profile_img">
                <ion-img></ion-img>
            </div>
        </div>
        <div class="profile_view">
            <h2>{{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</h2>
            <small>{{ user.role }}</small>
            <div class="profile_grid" >
                <span class="field">Username</span>
                <span class="value">{{ user.username }}</span>
            </div>
            <div class="profile_grid">
                <span class="field">Email</span>
                <span class="value">{{ user.email }}</span>
            </div>
            <div class="profile_grid">
                <span class="field">Joined On</span>
                <span class="value">{{ user.created }}</span>
            </div>
            <ion-button expand="block" @click="$router.push('/customer/profile/update')">Update Profile</ion-button>
            <span class="link" @click="logout">Log Out</span>
        </div>
    </ion-content>
</ion-page>
</template>


<script>
import { 
    IonPage,
    IonContent,
    IonImg
} from '@ionic/vue';
import { 
    bookOutline,
    timeOutline,
    personCircleOutline,
    logOutOutline
} from 'ionicons/icons';
import router from '@/router';
import { axiosReq, local } from '@/functions';
import { ciapi } from '@/js/globals';

export default({
    name: "CustomerDashboard",
    components:{
        IonPage,
        IonContent,
        IonImg,
    },

    data(){
        return{
            //ionicons
            bookOutline,
            timeOutline,
            personCircleOutline,
            logOutOutline,
            //end of ionicons

            user: {},
        }
    },
    mounted(){
        this.user = JSON.parse(local.get('user_info'));
        this.user.created = new Date(Date.parse(this.user.created_at.match('[0-9]+-[0-9]+-[0-9]+')[0])); // our Date object
        this.user.created = this.user.created.toLocaleDateString("en-US", {month:'long',day:'numeric',year:'numeric'});
    },
    methods:{
       
        logout(){
            axiosReq({
                method:'post',
                url: ciapi+'/users/logout',
                headers:{
                    PWAuth: local.get('user_token'),
                    PWAuthUser: local.get('user_id')
                }
            }).catch(()=>{
                this.openToast('Something went wrong...', 'danger');
            }).
            then(()=>{
                local.remove('user_id');
                local.remove('user_token');
                local.remove('user_info');
                router.replace('/login');
            });

            
        }
    }
});
</script>

<style scoped>
ion-content{
    --ion-background-color: var(--ion-color-dark-contrast);
}

.profile_img{position: absolute;
top: 30px;
left: 50px;
right: 50px;width: 200px;height: 200px;margin: 0 auto;border-radius: 50%;overflow: hidden;border:10px solid #fff;box-shadow: 0 0 5px #000;background: #b7170b;}
.profile_img ion-img{width:inherit;height: inherit;border-radius: 50%;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);}
.section{
    background: var(--ion-color-dark-red);
    height: 200px;
    position: relative;
    top: 0;
}
.section::before {
  content: "";
  position: absolute;
  top: 200px;
  background-color: #fff;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #b7170b; /* This is where the magic happens! */
}
.section::after{
    content: "";
    position: absolute;
    top: 200px;
    background-color: #fff;
    height: 50px;
    width: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -25px 0 0 #b7170b;
    right: 0;
}
.profile_view{background:#fff;padding: 70px 20px 20px;border-radius: 20px 20px 0 0;margin-top: -50px;text-align: center;min-height:calc(100vh - 277px);height: auto;}
.profile_view h2{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: 5.7vw;}
.profile_view small{margin: 0 0 40px;font-size: 18px;display: block;}
.profile_grid{display: flex;justify-content: space-between;padding: 10px 0;border-bottom: 1px solid #aaa;}
.profile_grid .field{font-weight: bold;}
.profile_grid .value{color:#b7170b;max-width: 60vw;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
ion-button{--background: #b7170b;
    --background-activated: var(--ion-color-hover-red);margin: 20px 0;--padding-top: 20px;--padding-bottom: 20px;}
.link{
  color:#b7170b;
}

@media only screen and (min-width:500px){
.profile_view h2{font-size: 30px;}
}
</style>

