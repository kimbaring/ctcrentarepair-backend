<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/technician/tasks/taskdetails"></ion-back-button>
                </ion-buttons>                
            </ion-toolbar>
            <ion-title>Customer Location</ion-title>
        </ion-header>

        <ion-content>
            <div class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121979.97053401588!2d-74.10890246224842!3d40.685281845644305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty!5e0!3m2!1sen!2sph!4v1657638758299!5m2!1sen!2sph"></iframe>
            </div>
            <div class="det">
                <h3>Service Location</h3>
                <h3>123 Sample Street, Pageland, SC</h3>
                <div class="buttonflex">
                    <section>
                    <ion-button expand="block">Accept</ion-button>
                    </section>
                    <section>
                    <ion-button expand="block">Decline</ion-button>
                    </section>
                </div>
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
    IonContent,
    IonButton
} from '@ionic/vue';
import {    
    locationSharp,
} from 'ionicons/icons';



export default({
    components:{
        IonTitle,
        IonPage,
        IonHeader,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonContent,
        IonButton
    },
    data(){
        return{
            // ionicons
            locationSharp,
            // end of ionicons

        }
    },
});
</script>


<style scoped>
.ion-page{min-height: 600px;}
ion-content{--ion-background-color:#222;border-radius:20px 20px 0 0;overflow:hidden;--color:#fff}
.map{margin: 0 -20px 10px;}
.map iframe{width:100%;box-sizing:border-box;height:54vh;border:none}
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
.buttonflex{
    display: flex;
    flex-wrap: wrap;
}
.buttonflex section{
    width: 48%;
}
.buttonflex ion-button{
    --border-radius: 10px;
}
.det{
    padding-left: 20px
}
</style>