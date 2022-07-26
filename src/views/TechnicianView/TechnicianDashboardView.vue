<template>
<ion-page>
    <ion-content :fullscreen="true">
        <div class="mainlogo">
            <img src="../../img/headerlogo.png"/>
        </div>
        <p>Welcome, John Doe!</p>
        <div class="serv">
            <ion-card>
                    <ion-card-content>
                        <h3>Wallet</h3>
                        <div class="services">
                         <h3 style="color:white;">Your current balance is $200</h3>
                        </div>
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
ion-content h3{
    color: #fff;
    margin: 10px auto 30px;
    font-weight: 700;
    text-align: center;
    padding: 0 10px;
}
ion-content p{
    margin:30px 0 0;
    color:#fff;
    text-align: center;
}


.serv ion-card{
    box-shadow: none;
}
.serv ion-card-content{
    padding: 0;
}
.services{
    display: flex;
    text-align: center;
    color: #000;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    flex-wrap: wrap;
    justify-content: center;
    gap:10px;
    margin: 0 0 20px;
}

.services ion-card{
    width:30%;
    padding:20px 5px;
    color:#fff;
    border:none;
    border-radius:20px;
    background: #6b0700;
    border:3px solid #6b0700;
    margin: 0;
    display: flex;
justify-content: center;
align-items: center;
}
.services ion-card-content{
    
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.services ion-card:hover{
    border:3px solid #fff;
}
.services ion-card::before{
    content:"";
    position:absolute;
    top:50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    width:0;
    height: 0;
    background: rgb(255,255,255,0.4);
    border-radius: 20px;
    transition: 0.4s;
}
.services ion-card:active::before{
    width: 300%;
    height: 300%;
}

.services ion-icon{
    display: block;
    text-align: center;
    font-size: 50px;
    color: #000;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: #fff;
}
.services img{
    width: 69px;
    margin-bottom: 1px;
    display: block;
}

.announcements{
    background: #fff;
    min-height: calc(100vh - 411px);
    padding: 20px;
    border-radius: 30px 30px 0 0;
}

.announcements ion-card{
    background: #fff;
    border:1px solid #ccc;
    box-shadow:none;
    padding:10px;
    border-radius:20px;
}
.announcements ion-title slot{
    --font-weight: 700 !important;
    color: #b7160b;
}


</style>
