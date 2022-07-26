<template>
  <ion-page>
    <ion-content>
      <div class="whitebg">
      </div>
      <div class="content">
        <ion-card>
          <ion-card-header>
            <img src="../../img/logo.png" alt="">
          </ion-card-header>
          <ion-card-content>
                <div class="title"><h3>Sign Up as</h3></div>
                <section>
                    <ion-button @click="$router.push('/registercustomer')" expand="block"><div><ion-icon :icon="personCircleOutline"></ion-icon> Customer</div></ion-button>
                    <ion-button @click="$router.push('/registertechnician')" expand="block"><div><ion-icon :icon="constructOutline"></ion-icon> Technician</div></ion-button>
                    <ion-button @click="$router.push('/registertowCompany')" expand="block"><div class="towicon"><img src="../../img/tow.png"> Tow Truck Operator</div></ion-button>
                    <ion-button @click="$router.push('/registerridesharer')" expand="block"><div><ion-icon :icon="carOutline"></ion-icon> Ride Sharer</div></ion-button>
                </section>
                <p>Already have an account? <a @click="$router.push('/login')">Sign In</a></p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard,IonCardHeader,IonCardContent,IonButton,IonIcon} from '@ionic/vue';
import {personCircleOutline, constructOutline, carOutline} from 'ionicons/icons';

export default ({
  name: 'RegisterPage',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon
  },
  data(){
    return{
        personCircleOutline, constructOutline, carOutline
    }
  }
});
</script>

<style scoped>
*{margin: 0;padding: 0;}
.whitebg{
  background-color: white;
  height: 25vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.content{
  height: 100%;
  min-height: 678px;
  position: relative;
}
ion-content{
  --ion-background-color: black;
  position:relative;
}
ion-card{
  position: absolute;
  left: 0;
  right: 0;
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin: 25px 25px 25px 25px;
  border-radius: 29px;
  background-image: url('@/img/backgroundrentarepair.jpg');
  background-size: cover;
  background-position: bottom;
  min-height: 500px;
  height: 93%;
}
ion-card-header{
  text-align:center;
  position: absolute;
  top: 50px;
  left: 15%;
  right: 0;
  width: 70%;
}
ion-card-content{
  position: absolute;
  bottom: 50px;
  left: 20px;
  right: 20px;
}
/**END OF CARD LAYOUT */
ion-button{
    height: 55px;
    --background: #FFFFFF;
    --border: 1px solid #D9D9D9;
    --border-radius: 10px;
    color: #B7170B;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin: 0 0 15px 0;
    opacity: 1;
    --background-activated: var(--ion-color-light-danger);
}
p{
    text-align: center;
}
ion-icon{
    --color: #B7170B;
    font-size: 30px;
    margin-right: 5px;
}
ion-button div{
    margin-right: auto;
    display: flex;
    align-items: center;
}
.towicon img{
    width: 30px;
    margin-right: 5px;
}
.title h3{
  font-size: 20px;
  text-align: center;
}
.title{
  position: absolute;
  top: -40px;
  left: 25%;
  right: 25%;
}
</style>
