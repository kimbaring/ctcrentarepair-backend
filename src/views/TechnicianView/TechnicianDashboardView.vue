<template>
<ion-page>
    <ion-content :fullscreen="true">
        <div class="mainlogo">
            <img src="../../img/headerlogo.png"/>
        </div>
        
        <div class="top">
            <h2>Welcome, <span>John Doe!</span></h2>
            <ion-card>
                    <ion-card-content>
                        <h3 style="color:white;">Your Wallet</h3>
                        <h2><sup>$</sup>200</h2>
                    </ion-card-content>
            </ion-card>
        </div>
        <div class="announcements">
            <ion-card>
                <ion-card-header>
                <ion-card-title>Total Tasks</ion-card-title>
            </ion-card-header>
                <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean. 
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-header>
                <ion-card-title>Task History</ion-card-title>
            </ion-card-header>
                <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean. 
                </ion-card-content>
            </ion-card>
        </div>
        
    </ion-content>
</ion-page>
</template>


<script>
import { 
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
} from '@ionic/vue';
import { 
    bookOutline,
    timeOutline,
    personCircleOutline,
    logOutOutline,
    carSportOutline,
    constructOutline
} from 'ionicons/icons';
import { local } from '@/functions';
import  router  from '@/router';

export default({
    name: "CustomerDashboard",
    components:{
        IonPage,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonCardTitle,
    },

    data(){
        return{
            //ionicons
            bookOutline,
            timeOutline,
            personCircleOutline,
            logOutOutline,
            carSportOutline,
            constructOutline
            //end of ionicons
        }
    },
    methods:{
        startService(service){
            local.setObject('customer_task',{service_type: service});
            router.push('/customer/dashboard/location');
        }
    }
});
</script>

<style scoped>
.mainlogo{
    background: var(--ion-color-danger-contrast);
    height: 150px;
    position: relative;
    top: 0;
}
.mainlogo img{
    display: block;
    margin: 0 auto;
    padding-top: 60px;
}
.mainlogo::before {
  content: "";
  position: absolute;
  top: 150px;
  background-color: #b7170b;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #fff; /* This is where the magic happens! */
  z-index: -1;
}
.mainlogo::after{
    content: "";
    position: absolute;
    top: 150px;
    background-color: #b7170b;
    height: 50px;
    width: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -25px 0 0 #fff;
    right: 0;
}
ion-content{
    --ion-background-color: var(--ion-color-content);
}

.top > h2{
    color:#fff;
    font-size: 18px;
    font-weight: 700;
    height: 100px;
    max-width: 200px;

}

.top h2 span{
    font-size: 30px;
    display: block;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
}

.top{
    display: flex;
    padding: 40px 20px;
    justify-content: space-around;
}

.top ion-card{
    text-align: center;
    box-shadow: none;
    color:#fff;
    background:#6b0700;
    width:150px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.top ion-card-content h2{
    font-size: 30px;
    font-weight: 700;
}

.top ion-card-content h2 sup{
    font-size: 16px;
}



.announcements{
    background: #fff;
    min-height: calc(100vh - 411px);
    padding: 20px;
    border-radius: 30px 30px 0 0;
}

.announcements ion-card{
    background: #fff;
    color:#333;
    box-shadow: 0 2px 5px #aaa;
    padding:10px;
    border-radius:20px;
}
.announcements ion-title slot{
    --font-weight: 700 !important;
    color: #b7160b;
}


</style>
