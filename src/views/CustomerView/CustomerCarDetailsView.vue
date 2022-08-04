<template>
    <ion-page>
         <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/customer/dashboard/location"></ion-back-button>
                </ion-buttons>                
            </ion-toolbar>
        </ion-header>
        <ion-content>
             <div class="section">
                <ion-title>Customer Car Details</ion-title>
            </div> 
            <div class="form">
                <div>
                    Owner Name
                    <ion-input v-model="customer.name" placeholder="e.g. John Doe"></ion-input>
                </div>
            
                <div class="col2">
                    <div>
                        Plate No.
                        <ion-input v-model="customer.plate_number" placeholder="e.g. XYZ123"></ion-input>
                    </div>
                    <div>
                        Model
                        <ion-input v-model="customer.model" placeholder="e.g. Toyota"></ion-input>
                    </div>
                </div>
                <div>
                    Brand
                    <ion-input v-model="customer.brand" placeholder="e.g. Sedan"></ion-input>
                </div>
                 <div>
                    More Information
                    <ion-textarea v-model="customer.more_information" placeholder="e.g. Broken breaks, engine smoking, etc."></ion-textarea>
                </div>
            </div>
            <div class="submit_btn">
                <ion-button expand="block" size="large" @click="submit">Submit</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>


<script>
import {
    IonTitle,
    IonPage,
    IonBackButton,
    IonHeader,
    IonButtons,
    IonToolbar,
    IonContent,
    IonInput,
    IonTextarea
} from '@ionic/vue';
import {local, openToast,validateForm, axiosReq, dateFormat} from '@/functions';
import router from '@/router';
import { ciapi } from '@/js/globals';
import { push } from '@/firebase';



export default({
    components:{
        IonTitle,
        IonPage,
        IonHeader,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonContent,
        IonInput,
        IonTextarea
    },
    data(){
        return{
            customer:{}
        }
    },
    methods:{
        submit(){
            const valid = validateForm(this.customer,{
                name: "required",
                plate_number: "required",
                model: "required",
                brand: "required",
                callback:()=>{openToast('Required fields are empty!', 'danger')}
            });
            if(!valid.allValid) return;

            local.setInObject('customer_task','name', this.customer.name);
            local.setInObject('customer_task','description', this.customer.more_information);
            delete this.customer.more_information;
            delete this.customer.name;

            local.setInObject('customer_task','details',this.customer);
            local.setInObject('customer_task','details',JSON.stringify(local.getObject('customer_task').details));

            axiosReq({
                method: 'post',
                url: ciapi+'task/create',
                headers:{
                    PWAuth: local.get('user_token'),
                    PWAuthUser: local.get('user_id')
                },
                data: local.getObject('customer_task')
            }).catch(()=>{
                openToast('Something went wrong', 'danger');
            }).then(res=>{
                if(!res.data.success) return;
                let task = res.data.task_info;
                task.details = local.objectify(task.details);
                router.push('/customer/dashboard/location/cardetails/booked');
                push(`pending_tasks/${task.id}`,task);
                openToast('Request sent!', 'success');
            })
        }
    }
});
</script>

<style scoped>
.header-ios ion-toolbar:last-of-type{
    --border-width: 0px;
}
.section{
    background: var(--ion-color-dark-red);
    height: 97px;
    position: relative;
}
.section ion-title{
    padding-top: 50px;
    font-size: 19px;
    color: #fff;
    text-align: center;
}
.section::before {
  content: "";
  position: absolute;
  top: 97px;
  background-color: transparent;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #b7170b; /* This is where the magic happens! */
}
.section::after{
    content: "";
    position: absolute;
    top: 97px;
    background-color: transparent;
    height: 50px;
    width: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -25px 0 0 #b7170b;
    right: 0;
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
  box-shadow: 0 -25px 0 0 #fff; /* This is where the magic happens! */
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
    box-shadow: 1px -25px 0 0 #fff;
    right: 0;
}
ion-back-button{color: #fff}
ion-header{color:#fff;}
ion-header small{text-align: center;display: block;}
ion-header::after {background-image: none;}
ion-toolbar{--background:#b7160b; color: #fff}
.form{min-height:596px; background-color: #fff; padding-top: 20px;}
.form > div{margin:15px;}
.form ion-input{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px}
.form ion-textarea{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px;height:15vh}
.submit_btn{ width:100%;padding:20px;z-index:10}
.submit_btn ion-button{--background:#fff;--color:#222;font-size:14px;--padding-top:15px;--padding-bottom:15px;--border-radius:10px}
ion-button{--background: #b7160b;}
ion-content{
    --ion-background-color: #b7160b
} 
/* 
ion-content{--background:#fff;border-radius: 20px 20px 0 0;overflow:hidden}
.form{min-height:500px}
.form > div{margin:15px;}
.form ion-input{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px}
.form ion-textarea{border:1px solid #aaa;border-radius:10px;margin:10px 0 0;--padding-top:15px;--padding-bottom:15px;--padding-start:15px;--padding-end:15px;height:15vh}
.submit_btn{position:fixed;bottom:0;left:0;background:#b7160b;width:100%;height:130px;padding:20px;z-index:10}
.submit_btn ion-button{--background:#fff;--color:#222;font-size:14px;--padding-top:15px;--padding-bottom:15px;--border-radius:10px}
.ion-page{background-color: #b7160b;}
ion-button{--background: #b7160b;}
ion-title{text-align: center;}
ion-header{color:#fff;padding-bottom: 20px;}
ion-header small{text-align: center;display: block;}
ion-header::after {background-image: none;}
ion-toolbar{--background:#b7160b;--color:#fff}
ion-input{--background: #fff;--color: #333;}
.col2{display: flex;justify-content: space-between;}
.col2 > *{width: 48%;} */
</style>
