<template>
  <ion-page>
    <ion-content>
      <div class="whitebg">
      </div>
      <div class="content">
        <ion-card>
          <ion-card-header>
            <img src="@/img/logo.png" alt="">
          </ion-card-header>
          <ion-card-content>
            <div class="verifmsg">
            We sent a verification code to {{user_email}}. Please check your email and enter the code below.
            </div>
            <ion-input placeholder="6-pin digit code" v-model="verification_code"></ion-input>
            
            <div class="buttonflex">
                <ion-button class="loginbutton" expand="block" @click="verify">Verify Email</ion-button>
                <p v-if="resend_timer === 0">Did not receive the code? <span class="link" @click="resend">Resend</span></p>
                <p v-else class="resend">Please wait for <span class="link">{{ resend_timer }}s</span> to resend...</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard,IonCardHeader,IonCardContent,IonButton,IonInput} from '@ionic/vue';
import { axiosReq, validateForm, openToast } from '@/functions';
import { ciapi } from '@/js/globals';
import router from '@/router';

export default ({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonInput
  },
  data(){
    return {
      verification_code: null,
      user_email: '',
      resend_timer: 0
    };  
  },
  methods:{
    resend(){
       axiosReq({
          method: 'post',
          url: ciapi+'email/sendverification',
          data: {
            user_email: localStorage.getItem('user_email')
            }
        }).then(()=>{
          openToast('Verification Code sent', 'success');
          this.resend_timer = 60;
          const timer = setInterval(()=>{
            this.resend_timer--;
            if(this.resend_timer == 0) clearInterval(timer);
          }, 1000);
      });
    },
    verify(){
      let valid = validateForm({verification_code:this.verification_code},
      {verification_code:{
        isRequired:true,
        isInteger:true,
        minChars: 6,
        maxChars: 6,
        callback:()=>{openToast('Verification code must be a 6-digit code!', 'danger')}
      }});

      if(!valid.allValid) return;


      axiosReq({
          method: 'post',
          url: ciapi+'users/verify',
          data: {
            user_email: localStorage.getItem('user_email'),
            verification_code: this.verification_code
            }
        }).then(res=>{
        if(res.data.msg === 'invalid code') openToast('Invalid Code!', 'danger');
        else if(res.data.success) {
          openToast('Verification successful!', 'success');
          localStorage.removeItem('user_email');
          router.replace('/login');
        }
      });
    }
  },
  created(){
    this.user_email = localStorage.getItem('user_email');
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

.verifmsg{
  text-align: center;
  margin: 0 0 20px;
}

.link{
  color:#b7170b;
}


</style>
