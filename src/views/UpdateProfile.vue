<template>
    <ion-page>

    <ion-content>
        
        <div class="section">
            <div class="profile_img">
                <div class="loadinner"></div>
                <ion-img :src="profile_img"></ion-img>
            </div>
            <div class="profile_form">
                <ion-input v-model="user.firstname" placeholder="First Name"></ion-input>
                <ion-input v-model="user.middlename" placeholder="Middle Name"></ion-input>
                <ion-input v-model="user.lastname" placeholder="Last Name"></ion-input>
                <ion-input v-model="user.username" placeholder="Username"></ion-input>
                <ion-input v-model="user.email" placeholder="Email"></ion-input>
                <ion-button expand="block" @click="$router.push('/'+$route.path.split('/')[1]+'/profile/changepassword')">Change Password</ion-button>
                <ion-button expand="block" @click="reset">Reset</ion-button>
                <ion-button expand="block" class="save" @click="save">Save</ion-button>
            </div>
        </div>
    </ion-content>
</ion-page>
</template>


<script>
import { 
    IonPage,
    IonContent,
    IonImg,
    IonInput,
    IonButton
} from '@ionic/vue';
import { axiosReq, validateForm, openToast, local } from '@/functions';
import { ciapi } from '@/js/globals';
import router from '@/router';

export default({
    components:{
        IonPage,
        IonContent,
        IonImg,
        IonInput,
        IonButton
    },
    data(){
        return{
            profile_img: null,
            user:{
                firstname: '',
                middlename: '',
                lastname: '',
                username: '',
                email: ''
            }
        };
    },
    mounted(){
        const user_info = local.getObject('user_info');
        this.profile_img = user_info.profile_img;
        this.user.firstname = user_info.firstname;
        this.user.middlename = (user_info.middlename == null) ? '' : user_info.middlename;
        this.user.lastname = user_info.lastname;
        this.user.username = user_info.username;
        this.user.email = user_info.email;
    },
    methods:{
        reset(){
            const user_info = local.getObject('user_info');
            this.user.firstname = user_info.firstname;
            this.user.middlename = (user_info.middlename == null) ? '' : user_info.middlename;
            this.user.lastname = user_info.lastname;
            this.user.username = user_info.username;
            this.user.email = user_info.email;
        },
        save(){
            const valid = validateForm(this.user,{
                firstname: "required",
                lastname: "required",
                username: "required",
                email:{
                    isEmail: true,
                    isRequired: true,
                    callback:()=>{
                        openToast('Email must be in valid format!', 'danger')
                    }
                },
                callback:()=>{
                    openToast('Required fields are empty!', 'danger')
                }
            });

            if(!valid.allValid) return;
        
            axiosReq({
                method: 'post',
                url: ciapi+'users/update?user_id='+local.get('user_id'),
                headers:{
                    PWAuth: local.get('user_token'),
                    PWAuthUser: local.get('user_id')
                },
                data:this.user
            }).catch(()=>{
                openToast('Something went wrong!', 'danger');
            }).then(res=>{
                if(res.data.success){
                    openToast('Profile updated!', 'success');
                    let user_info = local.getObject('user_info');
                    user_info.firstname = this.user.firstname;
                    user_info.middlename = (this.user.middlename == null) ? '' : this.user.middlename;
                    user_info.lastname = this.user.lastname;
                    user_info.username = this.user.username;
                    user_info.email = this.user.email;
                    local.set('user_info', JSON.stringify(user_info));
                    router.go(-1);
                }
                else if(res.data.msg == 'invalid token') openToast('Token expired!', 'danger');
            });

        }
    }
});

</script>



<style scoped>

.profile_img{position: absolute;
top: 30px;
left: 50px;
right: 50px;width: 200px;height: 200px;margin: 0 auto;border-radius: 50%;overflow: hidden;background: #b7170b;z-index:3}
.profile_img ion-img{width:inherit;height: inherit;border-radius: 50%;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);}
.section{
    background: #333;
    height: 200px;
    position: relative;
    top: 0;
    height: 850px;
}

.section::before{
    content:"";
    position: absolute;
    top:0;
    width: 100%;
    height: 50%;
    background: #eee;
}

.loadinner{position:absolute;width:80px;height:80px;border-top:5px solid #fff;border-left:5px solid #fff;border-right:5px solid #6b0700;border-bottom:5px solid #6b0700;top:50%;left:50%;transform: translateX(-50%) translateY(-50%);border-radius:50%;animation-name:loadinner;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:linear;}

@keyframes loadinner{
  0%{transform: translateX(-50%) translateY(-50%) rotate(0deg);}
  100%{transform: translateX(-50%) translateY(-50%) rotate(360deg);}
}

.profile_form{
   background: #fff;
    height: auto;
    padding: 20px;
    z-index: 2;
    position: absolute;
    width: 90%;
    top: 175px;
    left: 50%;
    transform: translateX(-51%);
    border-radius: 20px;
    padding:100px 20px 20px;
}


.profile_form a{
    display: block;
    display: flex;
    text-decoration: none;
    margin-bottom: 10px;
    color:#b7170b;
    text-align: center;
    display: block;
}
.profile_form ion-input{
    border-radius: 10px;
    border:1px solid #ccc;
    margin: 10px 0 20px;
    --padding-top:15px;
    --padding-bottom:15px;
}


ion-button{
    --background:transparent;
    --color:#b7170b;
    --box-shadow: none;
    border: 2px solid #b7170b;
    height:50px;
    margin:10px 0;
    border-radius: 5px;
}

ion-button.save{
    border:none;
    --background: #b7170b;
    color:#fff;
}


</style>
