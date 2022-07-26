<template>
    <ion-page>
    <ion-content>
        <div class="section">
            <div class="profile_img">
                <ion-img></ion-img>
            </div>
            <div class="profile_form">
                <ion-input type="password" v-model="user.current_password" placeholder="Current Password"></ion-input>
                <ion-input type="password" v-model="user.new_password" placeholder="New Password"></ion-input>
                <ion-input type="password" v-model="user.cnfnew_password" placeholder="Confirm New Password"></ion-input>
                <ion-button @click="save" expand="block">Save</ion-button>
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
    IonInput
} from '@ionic/vue';
import {axiosReq,validateForm,openToast,local} from '@/functions';
import {ciapi} from '@/js/globals';

export default({
    components:{
        IonPage,
        IonContent,
        IonImg,
        IonInput
    },
    data(){
        return{
            user:{}
        };
    },
    methods:{
        save(){
            const valid = validateForm(this.user,{
                current_password: {
                    isRequired: true,
                    minChars: 8,
                    callback: ()=>{openToast('Password must be more than 8 characters!', 'danger');}   
                },
                new_password: {
                    isRequired: true,
                    minChars: 8,
                    callback: ()=>{openToast('Password must be more than 8 characters!', 'danger');}   
                },
                cnfnew_password: {
                    equalTo: this.user.new_password,
                    callback: ()=>{openToast('Password and Confirm Password must match!', 'danger');}
                },
                callback:()=>{openToast('All fields are required!', 'danger');}
            });

            if(!valid.allValid) return false;

            axiosReq({
                method: 'post',
                url: ciapi +'/users/changePassword',
                headers:{
                    PWAuth: local.get('user_token'),
                    PWAuthUser: local.get('user_id')
                },
                data: this.user
            }).catch(()=>{
                    openToast('Something went wrong...', 'danger');
            }).then(res=>{
                if(res.data.msg === 'wrong password') openToast('Wrong Password!', 'danger');
                else if(res.data.success){
                    openToast('Password Changed!', 'success');
                }
                this.user = {role:"Customer"};
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
    height: 100%;
    min-height: 100vh;
}

.section::before{
    content:"";
    position: absolute;
    top:0;
    width: 100%;
    height: 50%;
    background: #eee;
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
    margin-top: 20px;
    --background: #b7170b;
}

ion-button{
    height:50px;
    margin:10px 0;

}
</style>
