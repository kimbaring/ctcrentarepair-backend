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
            <ion-input placeholder="Email"></ion-input>
            <div class="buttonflex">
                <ion-button class="loginbutton" expand="block">Reset Password</ion-button>
                <ion-button @click="$router.push('/login')" class="signupbutton" expand="block">Back</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard,IonCardHeader,IonCardContent,IonButton,IonInput} from '@ionic/vue';

export default ({
  name: 'ForgotPassword',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonInput
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

/**End of Card */
.loginbutton{
    height: 50px;
    --border-radius: 10px;
    margin-bottom: 10px;
    --background: #b7170b;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    --background-activated: var(--ion-color-hover-red);
}
.signupbutton{
    height: 50px;
    --border-radius: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    --background: #b7170b;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    --background-activated: var(--ion-color-hover-red);
}
ion-input{
    width: 277px;
    height: 51px;
    border: 1px solid #e2e2e2;
    background-color: #fff;
    border-radius: 11px;
    width: 100%;
    margin: 0 0 10px 0;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    --padding-start:15px
}
.buttonflex section{
    width: 48%;
    margin-left: 3px;
}
ion-card-content section{
    text-align: center;
    text-decoration: none;
}
</style>
