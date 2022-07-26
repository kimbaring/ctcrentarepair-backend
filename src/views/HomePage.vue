<template>
  <ion-page>
    <ion-content>
      <div class="whitebg">
      </div>
      <div class="content">
        <ion-card>
          <ion-card-header>
            <img src="../img/logo.png" alt="">
          </ion-card-header>
          <ion-card-content>
            <section>
              <ion-button class="loginbutton" @click="$router.push('/login')" expand="block">Sign In</ion-button>
            </section>
            <section>
              <ion-button class="signupbutton" expand="block"><img src="../img/google.png"> Sign in with Google</ion-button>
            </section>
            <section>
              <ion-button class="signupappple" expand="block"><ion-icon :icon="logoApple"></ion-icon>Sign in with Apple</ion-button>
            </section>
            <section>
              <ion-button class="signupbutton" @click="$router.push('/register')" expand="block">Sign Up</ion-button>
            </section>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard,IonCardHeader,IonCardContent,IonButton, IonIcon} from '@ionic/vue';
import { logoApple } from 'ionicons/icons';

export default ({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon
  },
  setup(){
    return{
      logoApple,
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
  min-height: 550px;
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
  min-height: 570px;
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
.loginbutton{
  height: 50px;
  --border-radius: 10px;
  margin-bottom: 10px;
  --background: #b7170b;
  --background-activated: var(--ion-color-hover-red);
  font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

}
.signupbutton{
  height: 50px;
  --border-radius: 10px;
  margin-bottom: 10px;
  --background: #fff;
  color: #000;
  border: 1px solid rgba(0,0,0,0.1);
  --background-activated: var(--ion-color-light-danger);
  border-radius: 10px;
  font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
.signupappple{
  height: 50px;
  --border-radius: 10px;
  margin-bottom: 10px;
  --background: #000;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  --background-activated: var(--ion-color-dark-tint);
  border-radius: 10px;
  font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
.signupbutton img{
  margin-right: 5px;
}
ion-icon{
  margin-right: 5px;
  font-size: 30px;
}
</style>
