<template>
<ion-page>
    <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <div class="section">
            <div class="profile_img" @click="uploadChoose">
                <div class="loadinner"></div>
                <ion-img :src="user.profile_img"></ion-img>
                <input type="file" @change="openFile" hidden />
                <div class="uploadOverlay">Upload Image</div>
            </div>
        </div>
        <div class="profile_view">
            <h2>{{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</h2>
            <small>{{ user.role }}</small>
            <div class="profile_grid" >
                <span class="field">Username</span>
                <span class="value">{{ user.username }}</span>
            </div>
            <div class="profile_grid">
                <span class="field">Email</span>
                <span class="value">{{ user.email }}</span>
            </div>
            <div class="profile_grid">
                <span class="field">Joined On</span>
                <span class="value">{{ user.created }}</span>
            </div>
            <ion-button expand="block" @click="$router.push('/'+$route.path.split('/')[1]+'/profile/update')">Update Profile</ion-button>
            <span class="link" @click="logout">Log Out</span>
        </div>
        <div class="updateProfile" :class="(updateProfileMode) ? 'active' : null">
            <h3>Use this profile picture?</h3>
            <div>
                <ion-button @click="upload">Yes</ion-button>
                <ion-button @click="cancelUpload">Cancel</ion-button>
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
} from '@ionic/vue';
import { 
    bookOutline,
    timeOutline,
    personCircleOutline,
    logOutOutline
} from 'ionicons/icons';
import router from '@/router';
import { storage } from '@/firebase';
import { ref as sref, uploadString, getDownloadURL } from 'firebase/storage';
import { axiosReq, local, toDataURL, openToast, dateFormat } from '@/functions';
import { ciapi } from '@/js/globals';

export default({
    name: "CustomerDashboard",
    components:{
        IonPage,
        IonContent,
        IonImg
    },

    data(){
        return{
            //ionicons
            bookOutline,
            timeOutline,
            personCircleOutline,
            logOutOutline,
            //end of ionicons

            user: {},
            updateProfileMode: false
        }
    },
    mounted(){
        this.user = JSON.parse(local.get('user_info'));
        this.user.created = new Date(Date.parse(this.user.created_at.match('[0-9]+-[0-9]+-[0-9]+')[0])); // our Date object
        this.user.created = this.user.created.toLocaleDateString("en-US", {month:'long',day:'numeric',year:'numeric'});
    },
    methods:{
        uploadChoose(){
            if(!this.updateProfileMode) document.querySelector(".profile_img input").click();
        },
        openFile(event){
            toDataURL(event.target.files[0])
            .then(result=>{
                this.user.profile_img = result;
                this.updateProfileMode = true;
            });
        },
        cancelUpload(){
            this.updateProfileMode = false;
            this.user.profile_img = local.getObject('user_info').profile_img;
        },
        upload(){
            openToast('Uploading your profile...', 'warning');
            let result = this.user.profile_img;
            const date = new Date();
            const dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + 
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            const generateFileName = local.get('user_id')+dateFormat('%y%m%d%h%i%s',dateString);

            uploadString(sref(storage,'profile-images/'+generateFileName),result,'data_url').then(()=>{

            getDownloadURL(sref(storage,'profile-images/'+generateFileName)).then(result=>{
                document.querySelector(".profile_img ion-img").src = result;
                axiosReq({
                    method: 'post',
                    url: ciapi+'users/update?user_id='+local.get('user_id'),
                    headers:{
                        PWAuth: local.get('user_token'),
                        PWAuthUser: local.get('user_id')
                    },
                    data: {profile_img: result}
                }).catch(()=>{
                    openToast('Something went wrong!', 'danger');
                    this.updateProfileMode = false;
                }).then(res=>{
                    if(res.data.success){
                        openToast('Uploaded successfully!','success');
                        this.user.profile_img = result;
                        local.setInObject('user_info','profile_img',result);
                    }
                    else if(res.data.msg == 'invalid token') openToast('Token expired!', 'danger');
                    this.updateProfileMode = false;
                });
                });
            });
        },

        logout(){
            axiosReq({
                method:'post',
                url: ciapi+'/users/logout',
                headers:{
                    PWAuth: local.get('user_token'),
                    PWAuthUser: local.get('user_id')
                }
            }).catch(()=>{
                this.openToast('Something went wrong...', 'danger');
            }).
            then(()=>{
                local.remove('user_id');
                local.remove('user_token');
                local.remove('user_info');
                router.replace('/login');
            });
        }
    }
});
</script>

<style scoped>
ion-content{
    --ion-background-color: var(--ion-color-dark-contrast);
}

.profile_img{position: absolute;
top: 30px;
left: 50px;
right: 50px;width: 200px;height: 200px;margin: 0 auto;border-radius: 50%;overflow: hidden;border:10px solid #fff;box-shadow: 0 0 5px #000;background: #b7170b;}
.profile_img ion-img{width:inherit;height: inherit;border-radius: 50%;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);object-fit: cover;}

.uploadOverlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color:#fff;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    opacity:0;
}

.profile_img:active .uploadOverlay{
    opacity: 1;
}

.loadinner{position:absolute;width:80px;height:80px;border-top:5px solid #fff;border-left:5px solid #fff;border-right:5px solid #6b0700;border-bottom:5px solid #6b0700;top:50%;left:50%;transform: translateX(-50%) translateY(-50%);border-radius:50%;animation-name:loadinner;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:linear;}

@keyframes loadinner{
  0%{transform: translateX(-50%) translateY(-50%) rotate(0deg);}
  100%{transform: translateX(-50%) translateY(-50%) rotate(360deg);}
}



.section{
    background: var(--ion-color-dark-red);
    height: 200px;
    position: relative;
    top: 0;
}
.section::before {
  content: "";
  position: absolute;
  top: 200px;
  background-color: #fff;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #b7170b; /* This is where the magic happens! */
}
.section::after{
    content: "";
    position: absolute;
    top: 200px;
    background-color: #fff;
    height: 50px;
    width: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -25px 0 0 #b7170b;
    right: 0;
}
.profile_view{background:#fff;padding: 70px 20px 20px;border-radius: 20px 20px 0 0;margin-top: -50px;text-align: center;min-height:calc(100vh - 277px);height: auto;}
.profile_view h2{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: 5.7vw;}
.profile_view small{margin: 0 0 40px;font-size: 18px;display: block;}
.profile_grid{display: flex;justify-content: space-between;padding: 10px 0;border-bottom: 1px solid #aaa;}
.profile_grid .field{font-weight: bold;}
.profile_grid .value{color:#b7170b;max-width: 60vw;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
ion-button{--background: #b7170b;
    --background-activated: var(--ion-color-hover-red);margin: 20px 0;--padding-top: 20px;--padding-bottom: 20px;}
.updateProfile{
    position: fixed;
    z-index: 99;
    bottom: -100%;
    padding: 10px 20px;
    width: 100vw;
    box-shadow: 0 0 10px #aaa;
    border-radius: 20px;
    background: #fff;
    transition: 0.5s;
}

.active{
    bottom:50px
}

.updateProfile > div{display: flex;gap:10px}
.updateProfile ion-button{width: 48%;}


.link{
  color:#b7170b;
}

@media only screen and (min-width:500px){
.profile_view h2{font-size: 30px;}
}
</style>

