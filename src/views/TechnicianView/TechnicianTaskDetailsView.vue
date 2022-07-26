<template>
<ion-page>
    <ion-content>
        <div class="section">
            <a @click="$router.push('/technician/tasks')"><ion-icon :icon="arrowBack"></ion-icon></a>
            <h3>Maintenance Checkup</h3>
        </div>
        <div class="ioncardimg">
            <img src="../../img/carvertical.png" />
        <ion-card>
            <ion-card-content>
                <h2>Car Owner:</h2>
                <h2>John Doe</h2>
                <br />
                <h2>Contact number:</h2>
                <h2>123-1234-123456</h2>
                <br />
                <h2>Model:</h2>
                <h2>SUV</h2>
                <br />
                <h2>Year:</h2>
                <h2>2007</h2>
                <br />
                <div class="space"></div>
                <ion-button class="viewbutton" @click="$router.push('/technician/tasks/taskdetails/location')" expand="block">View Location</ion-button>
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
    IonCardContent,
    IonButton,
} from '@ionic/vue';
import { 
    bookOutline,
    timeOutline,
    personCircleOutline,
    logOutOutline,
    arrowBack
} from 'ionicons/icons';

export default({
    name: "CustomerDashboard",
    components:{
        IonPage,
        IonContent,
        IonCard,
        IonCardContent,
        IonButton,
    },

    data(){
        return{
            //ionicons
            bookOutline,
            timeOutline,
            personCircleOutline,
            logOutOutline,
            arrowBack
            //end of ionicons
        }
    }
});
</script>

<style scoped>
.space{
    padding-bottom: 30px;
}
ion-header{
    text-align: center;
}
ion-content{
    --ion-background-color: var(--ion-color-dark-red);
    border-radius: 30px !important;
}
.section{
    background: var(--ion-color-dark-red);
    height: 150px;
    position: relative;
}
.section h3{
    position: absolute;
    top: 70px;
    right: 0;
    left: 0;
    color: #fff;
}
.section ion-icon{
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 24px;
    position: absolute;
    top: 30px;
    left: 25px;
}
h3{
    color: #000;
    margin: 0px 20px 70px 20px;
    padding-left: 20px;
    text-align: left;
    font-size: 30px;
    width: 53%;
}
h2{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}
ion-card-content{
    min-height: 272px;
    position: relative;
}
ion-card-title{
    color: #000;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: start;
    height: 57px;
}
ion-card-title h3{
    padding-top: 10px;
    font-size: 20px;
}
ion-card-subtitle{
    color: #000;
}
ion-card-content{
    background-color: #f4f4f4;
}
.cardsection{
    display:flex;
    flex-wrap: wrap;
}
.cardsection p{
    width: 50%;
    margin: 5px auto;
    display:flex;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
    
}
ion-card-header{
    background-color:#ededed;
    position:relative;
}
.date{
    position: absolute;
    right: 23px;
    top: 29px;
    color: #B7160B;
}
.viewbutton{
    --background: #b7170b;
    --background-activated: var(--ion-color-hover-red);
    position: absolute;
    bottom: 10px;
    right: 20px;
    left: 20px;

}
.ioncardimg{
    position: relative;
}
.ioncardimg img{
    position: absolute;
    right: -1px;
    z-index: 1;
    top: -31px;
    width: 124px;
}
</style>
