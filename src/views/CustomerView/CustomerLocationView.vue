<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/customer/dashboard"></ion-back-button>
                </ion-buttons>                
            </ion-toolbar>
            <ion-title>Car Location</ion-title>
        </ion-header>

        <ion-content>
            <div class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121979.97053401588!2d-74.10890246224842!3d40.685281845644305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty!5e0!3m2!1sen!2sph!4v1657638758299!5m2!1sen!2sph"></iframe>
            </div>
            <div class="form">
                <div v-if="this.servicetype == 'Ride Sharer'" class="map_search">
                    <ion-icon :icon="locationSharp"></ion-icon>
                    <ion-input v-model="location" placeholder="From: Pin your location or input an address"></ion-input>
                </div>
                <br />
                <div v-if="this.servicetype == 'Ride Sharer'" class="map_search">
                    <ion-icon :icon="locationSharp"></ion-icon>
                    <ion-input v-model="location" placeholder="To: Pin your location or input an address"></ion-input>
                </div>
                <div v-else class="map_search">
                    <ion-icon :icon="locationSharp"></ion-icon>
                    <ion-input v-model="location" placeholder="Pin your location or input an address"></ion-input>
                </div>
                <div class="map_search_results">
                    <ion-card v-for="(l,i) in resultLocations" :key="i" @click="location = l">
                        {{l}}
                    </ion-card>
                </div>
                <ion-button expand="block" size="large" @click="setLocation">Next Step</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonTitle,
    IonPage,
    IonBackButton,
    IonHeader,
    IonButtons,
    IonToolbar,
    IonInput,
    IonIcon,
    IonContent,
    IonCard,
    IonButton
} from '@ionic/vue';
import {    
    locationSharp,
} from 'ionicons/icons';
import {local,openToast} from '@/functions';
import router from '@/router';



export default({
    components:{
        IonTitle,
        IonPage,
        IonHeader,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonInput,
        IonIcon,
        IonContent,
        IonCard,
        IonButton
    },
    data(){
        return{
            // ionicons
            locationSharp,
            // end of ionicons
            location: '',
            resultLocations:[
                "123 Street Address, City Name, 123 Street Address, City Name",
                "123 Street Address, City Name, 123 Street Address, City Name",
                "123 Street Address, City Name, 123 Street Address, City Name",
                "123 Street Address, City Name, 123 Street Address, City Name"
            ],
            servicetype: '',

        }
    },
    mounted(){
        if(local.getObject('customer_task').service_type){
            this.servicetype = local.getObject('customer_task').service_type;
            console.log(this.servicetype);
        }
        else{
            router.push("/customer");
        }
    },
    methods:{
        
        setLocation(){
            if(this.location == ''){
                openToast('Please enter/select a location!','danger');
                return;
            }

            local.setInObject('customer_task','location',this.location);
            router.push('/customer/dashboard/location/cardetails');
        }
    }
});
</script>


<style scoped>
.ion-page{min-height: 600px;}
ion-content{--ion-background-color:#222;border-radius:20px 20px 0 0;overflow:hidden;--color:#fff}
.map{margin: 0 -20px 10px;}
.map iframe{width:100%;box-sizing:border-box;height:35vh;border:none}
.form{padding:10px;}
.map_search{border-radius:10px;padding:5px;display:flex;background:#fff;border-radius:10px;align-items:center}
.map_search ion-icon{font-size:30px;color:#b7160b;}
.map_search_results{max-height:20vh;overflow-y:scroll;margin: 20px 0;padding: 0;}
ion-card{padding: 10px;border-radius: 0px;background: #121212;color:#fff;margin:0 0 10px}
ion-button{font-size:14px;--padding-top:30px;--padding-bottom:30px}
ion-card::after{content:"";background: rgba(255, 255, 255, 0.212);position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:0;height:0;border-radius:50%;transition:0.4s}
ion-card:active::after{width:500%;height:500%;}
.ion-page{background-color: #b7160b;}
ion-button{--background: #b7160b;}
ion-title{text-align: center;}
ion-header{color:#fff;padding-bottom: 20px;}
ion-header small{text-align: center;display: block;}
ion-header::after {background-image: none;}
ion-toolbar{--background:#b7160b;--color:#fff}
ion-input{--background: #fff;--color: #333;}
.col2{display: flex;justify-content: space-between;}
.col2 > *{width: 48%;}

</style>