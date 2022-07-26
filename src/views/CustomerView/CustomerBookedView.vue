<template>
    <ion-page>
         <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/customer/dashboard/location/cardetails"></ion-back-button>
                </ion-buttons>                
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="section">
            </div>
            <div class="form">
                <div class="worker">
                    <img src="../../img/maintenancecheck.png">
                    <div class="workdet">
                        <h3>Worker Name</h3>
                        <h3>Car Description</h3>
                        <h3>Phone number</h3>
                    </div>
                </div>
                <div class="services">
                    <div class="servdet">
                        <h3>Towing Service</h3>
                        <h3>Estimated Time</h3>
                        <h3>Distance</h3>
                    </div>
                    <div class="servval">
                        <h3>$40.00</h3>
                        <h3>25 mins</h3>
                        <h3>1.5 km</h3>
                    </div>
                </div>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121979.97053401588!2d-74.10890246224842!3d40.685281845644305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty!5e0!3m2!1sen!2sph!4v1657638758299!5m2!1sen!2sph"></iframe>
                </div>
            </div>
            <div class="submit_btn">
                <ion-button @click="$router.push('/customer/dashboard/location/cardetails/booked/chat')" expand="block" size="large">Chat</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>


<script>
import {
    IonPage,
    IonBackButton,
    IonHeader,
    IonButtons,
    IonToolbar,
    IonContent
} from '@ionic/vue';
//import {local, openToast,validateForm, axiosReq} from '@/functions';
//import router from '@/router';
//import { ciapi } from '@/js/globals';
//import { push } from '@/firebase';



export default({
    components:{
        IonPage,
        IonHeader,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonContent,
    },
    data(){
        return{
            customer:{}
        }
    },
    methods:{
        // submit(){
        //     const valid = validateForm(this.customer,{
        //         name: "required",
        //         plate_number: "required",
        //         model: "required",
        //         brand: "required",
        //         callback:()=>{openToast('Required fields are empty!', 'danger')}
        //     });
        //     if(!valid.allValid) return;

        //     local.setInObject('customer_task','name', this.customer.name);
        //     local.setInObject('customer_task','description', this.customer.more_information);
        //     delete this.customer.more_information;
        //     delete this.customer.name;

        //     local.setInObject('customer_task','details',this.customer);
        //     local.setInObject('customer_task','details',JSON.stringify(local.getObject('customer_task').details));

        //     axiosReq({
        //         method: 'post',
        //         url: ciapi+'task/create',
        //         headers:{
        //             PWAuth: local.get('user_token'),
        //             PWAuthUser: local.get('user_id')
        //         },
        //         data: local.getObject('customer_task')
        //     }).catch(()=>{
        //         openToast('Something went wrong', 'danger');
        //     }).then(res=>{
        //         if(!res.data.success) return;
        //         let task = res.data.task_info;
        //         task.details = local.objectify(task.details);
        //         router.push('/customer/dashboard/location/cardetails/waiting');
        //         push(`pending_tasks/${task.id}`,task);
        //         openToast('Request sent!', 'success');
        //     })
        // }
    }
});
</script>

<style scoped>
.map iframe{width:100%;box-sizing:border-box;height:35vh;border:none; border-radius: 10px;}
.worker img{
    width:70px;height: 70px;border-radius: 50%;
}
.worker{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ececec;
    justify-content: center;
}
.services{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}
.servdet{
    float: left;
    padding-right: 25%;
    color: #9b9b9b;
}
.servval{
    float: right;
    color: #ef867f;
}
.servdet h3{
    font-size: 15px;
    line-height: 10px;
}
.servval h3{
    font-size: 15px;
    line-height: 10px;
}

.workdet{
    padding-left: 30px;
}
.workdet h3{
    font-size: 15px;
    line-height: 10px;
    color: #9b9b9b;
}
.workdet h3:first-child{
    font-size: 23px;
    color: #000;
}
.header-ios ion-toolbar:last-of-type{
    --border-width: 0px;
}
.section{
    height: 433px;
    position: relative;
    background: url('../../img/clientbackground.jpg');
    background-size: cover;
}
.section ion-title{
    padding-top: 50px;
    font-size: 19px;
    color: #fff;
    text-align: center;
}
.submit_btn{
    position: relative;
}
.submit_btn::before{
  content: "";
  position: absolute;
  top: 0;
  background-color: transparent;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 0 0 0 #fff; /* This is where the magic happens! */
  left: 0;
}
.submit_btn::after{
    content: "";
    position: absolute;
    top: 0;
    background-color: transparent;
    height: 50px;
    width: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 0 0 0 #fff;
    right: 0;
}
ion-back-button{color: #fff}
ion-header{color:#fff;}
ion-header small{text-align: center;display: block;}
ion-header::after {background-image: none;}
ion-toolbar{--background:#b7160b; color: #fff}
.form{min-height:527px; background-color: #fff; padding-top: 20px; border-radius: 20px;
margin-top: -20px;
position: relative;}
.form ion-input{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px}
.form ion-textarea{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px;height:15vh}
.submit_btn{ width:100%;padding:20px;z-index:10}
.submit_btn ion-button{--background:#fff;--color:#222;font-size:14px;--padding-top:15px;--padding-bottom:15px;--border-radius:10px}
ion-button{--background: #b7160b;}
ion-content{
    --ion-background-color: #b7160b
}
/* ion-content{--background:#fff;border-radius: 20px 20px 0 0;overflow:hidden}
.form{min-height:500px}
.form > div{margin:15px;}
.form ion-input{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px}
.form ion-textarea{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px;height:15vh}
.submit_btn{position:fixed;bottom:0;left:0;background:#b7160b;width:100%;height:130px;padding:20px;z-index:10}
.submit_btn ion-button{--background:#fff;--color:#222;font-size:14px;--padding-top:15px;--padding-bottom:15px;--border-radius:10px}
.ion-page{background-color: #b7160b;}
ion-button{--background: #b7160b;}
ion-back-button{
    color: #fff
}
ion-title{text-align: center;}
ion-header{color:#fff;padding-bottom: 20px;}
ion-header small{text-align: center;display: block;}
ion-header::after {background-image: none;}
ion-toolbar{--background:#b7160b; color: #fff}
ion-input{--background: #fff;--color: #333;}
.col2{display: flex;justify-content: space-between;}
.col2 > *{width: 48%;} */
</style>
