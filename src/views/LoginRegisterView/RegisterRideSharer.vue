<template>
  <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button defaultHref="/register"></ion-back-button>
            </ion-buttons>
        </ion-toolbar>
        <ion-content>
            <div class="titlereg">
                <h3>Create new account as Ride Sharer</h3>
                <p>Please fill up the form</p>
            </div>
            <div class="regforms">
                <ion-input v-model="user.firstname" placeholder="First Name"></ion-input>
                <ion-input v-model="user.middlename" placeholder="Middle Name"></ion-input>
                <ion-input v-model="user.lastname" placeholder="Last Name"></ion-input>
                <ion-input v-model="user.username" placeholder="Username"></ion-input>
                <ion-list>
                    <ion-item>
                        <ion-label>EIN</ion-label>
                        <ion-radio id="toggleEII" @click="toggleEIN" mode="md" value="EIN"></ion-radio>
                    </ion-item>
                    <ion-item>
                        <ion-label>SSN</ion-label>
                        <ion-radio id="toggleSSS" @click="toggleSSN" mode="md" value="SSN"></ion-radio>
                    </ion-item>
                </ion-list>
                <ion-input v-model="user.workerinfo_ein_ssn" v-if="eII" placeholder="EI Number"></ion-input>
                <ion-input v-model="user.workerinfo_ein_ssn" v-if="sss" placeholder="SS Number"></ion-input>
                <ion-input v-model="user.workerinfo_businessinfo" placeholder="Business Info"></ion-input>
                <ion-input v-model="user.email" placeholder="Email"></ion-input>
                <ion-input v-model="user.password" type="password" placeholder="Password"></ion-input>
                <ion-input v-model="user.cnfpassword" type="password" placeholder="Confirm Password"></ion-input>
                <ion-button class="loginbutton" @click="register" expand="block">Register</ion-button>

                <p>Already have an account? <a @click="$router.push('/login')">Sign In</a></p>
            </div>
        </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage,IonBackButton,IonToolbar,IonButtons,IonInput,IonList,IonItem,IonLabel,IonRadio} from '@ionic/vue';
import {logoApple} from 'ionicons/icons';
import {axiosReq, validateForm,openToast} from '@/functions';
import { ciapi, needEmailVerif } from '@/js/globals';
import router from '@/router';

export default ({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonBackButton,
    IonButtons,
    IonInput,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonRadio
  },
  setup(){
    return{
      logoApple,
    }
  },
  data(){
    return{
        eII: false,
        sss: false,
        user: {role:"Ride Sharer"}
    };
  },
  methods:{
    toggleEIN: function () {
        document.getElementById("toggleSSS").checked = false;
        document.getElementById("toggleEII").checked = true;
        this.eII = true;
        this.sss = false;
    },
    toggleSSN: function () {
        document.getElementById("toggleEII").checked = false;
        document.getElementById("toggleSSS").checked = true;
        this.eII = false;
        this.sss = true;
    },
    register(){
        const valid = validateForm(this.user,{
            firstname: "required",
            lastname: "required",
            username: "required",
            workerinfo_ein_ssn: {
                isInteger: true,
                isRequired: true,
                callback: ()=>{
                    openToast('EI/SS number must be an integer!', 'danger');
                }  
            },
            workerinfo_businessinfo: "required",
            email: {
                isEmail: true,
                isRequired: true,
                callback: ()=>{
                    openToast('Email must be in valid format!', 'danger');
                }  
            },
            password: {
                isRequired: true,
                minChars: 8,
                callback: ()=>{
                    openToast('Password must be more than 8 characters!', 'danger');
                }   
            },
            cnfpassword: {
                equalTo: this.user.password,
                isRequired: true,
                callback: ()=>{
                    openToast('Password and Confirm Password must match!', 'danger');
                }   
            },
            callback: ()=>{
                openToast('Required fields are empty!', 'danger');
            }
        });

        if(!valid.allValid) return false;
        delete this.user.cnfpassword;
        openToast('Registration is inprogress...', 'warning');
        axiosReq({
            method: 'post',
            url: ciapi+'users/register',
            data: this.user
        }).catch(()=>{
                openToast('Something went wrong...', 'danger');
        }).then(res=>{
            if(res.data.msg === 'duplicate user') openToast('Account already exists!', 'danger');
            else{   
                openToast('Registration Successful!', 'success');
                
                if(!needEmailVerif) return;

                localStorage.setItem('user_email',this.user.email);
                router.replace('/verify-email');
            }
             this.user = JSON.parse("{'role':'Ride Sharer'}");  
        });
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
ion-toolbar{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    --ion-background-color: #fff;
}
ion-buttons{
    --ion-background-color: #fff;
}
ion-button{
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
.titlereg{
    text-align: center;
    position: absolute;
    top: 37px;
    left: 5%;
    right: 5%;
    width: 90%;
}
.titlereg h3{margin-bottom: 10px;}

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
.regforms{
    position: absolute;
    top: 150px;
    left: 20px;
    right: 20px;
}
.regforms p{
    text-align: center;
}
ion-content{
    --ion-background-color:none;
    background-image: url('@/img/backgroundrentarepair.jpg');
    background-size: cover;
    background-position: bottom;
    height: 100%;
    width: 100%;
}
ion-list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 10px 0; 
}
ion-item{
    width: 50%;
    background-color: #ffff;
}
/**END OF CARD LAYOUT */
</style>
