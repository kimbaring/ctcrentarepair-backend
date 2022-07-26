<template>
    <ion-page>

        <ion-buttons>
            <ion-back-button default-href="/customer/dashboard/location/cardetails/booked"></ion-back-button>
        </ion-buttons>

        <ion-content color="customred">
            <h2 class="ion-text-center title">Chat</h2>

            <div class="box_wrap">
                <div class="box_inner">
                    <ion-list>
                        <div class="box_user1">
                            <ion-item lines="none">
                                <ion-avatar>
                                    <ion-icon :icon="personCircle" size="large"></ion-icon>
                                </ion-avatar>
                                <ion-label>Hi, sir! I’m on my way <small>Wed, Jul 27 2022 2:05 AM</small></ion-label>
                            </ion-item>
                        </div>
                        <div class="box_user2">
                            <ion-item class="ion-text-end" slot="end" lines="none">
                                <ion-label slot="end" class="ion-text-wrap"> <small></small></ion-label>
                                
                                <ion-avatar slot="end">
                                    <ion-icon :icon="personCircle" size="large"></ion-icon>
                                </ion-avatar>
                            </ion-item>
                        </div>
                    </ion-list>
                </div>
                <div class="box_submit">
                    <ion-item>
                        <ion-input type="text" placeholder="send message here..."></ion-input>
                        <ion-button slot="end" @click="sendMessage" color="customred">
                            <ion-icon :icon="send"></ion-icon>
                        </ion-button>
                    </ion-item>
                </div>
            </div>

        </ion-content>

    </ion-page>
</template>

<script>
import { IonPage, IonBackButton, IonButtons, IonContent, IonItem, IonLabel, IonList, IonIcon, IonAvatar, IonInput, IonButton } from '@ionic/vue';
// import TabsFooter from '@/views/tabs/TabsFooter.vue'
import { personCircle, chatboxEllipses, send } from 'ionicons/icons';
// import '@/firebase';
// import { getDatabase, ref, push, onValue } from "firebase/database";
// import date from 'date-and-time';

export default ({
    components: { IonPage, IonBackButton, IonButtons, IonContent, IonItem, IonLabel, IonList, IonIcon, IonAvatar, IonInput, IonButton },
    setup() {
        return {
            personCircle, chatboxEllipses, send
        }
    },
    // data() {
    //     return {
    //         showMessage: "",
    //         messageList: []
    //     }
    // },
    // methods: {
    //     sendMessage() {
    //         if(this.showMessage == '') {
    //             alert('Message field is empty.')
    //             return
    //         }

    //         const db = getDatabase();
    //         const userID = Math.floor(Math.random(1) * 999);
    //         const now = new Date();
    //         const getSendDate = date.format(now, date.compile('ddd, MMM DD YYYY h:mm A')); 
    //         push(ref(db, 'Messages'), {
    //             ID: userID,
    //             Message: this.showMessage,
    //             Name: 'User',
    //             Send_Date: getSendDate
    //         });

    //         this.showMessage = "";
    //     }
    // },
    // mounted() {
    //     const db = getDatabase();
    //     const getMessage = ref(db, 'Messages');
    //     onValue(getMessage, (snapshot) => {
    //         const data = snapshot.val();
    //         this.messageList = data;
    //     });
    // }
})

</script>

<style scoped>

ion-buttons{background: #b7160b; padding: 12px 0 0 12px;}
.title{font-size: 26px; margin: 35px 0 68px;}
.title span{display: block;}
.box_inner{height: 50vh; overflow-y: scroll; position: relative;}
.box_inner ion-list{ padding: 12px 8px !important;background: none;}
.box_submit{position: absolute; bottom: -49px; left: 0; right: 0;}
.box_submit ion-item{--background: #e3e3e3 !important;border-radius: 0 0 20px 20px;}
.box_user1 ion-item{margin: 8px 0 0;}
.box_user2 ion-item{margin: 8px 0 0;--background: #eee !important; border-radius: 30px;}
.box_user1 ion-item small{display: block; font-size: 9px; position: absolute; left: 40px; color: #808080; font-style: italic;bottom: 0;}
.box_user2 ion-item a{position: absolute; left: 0; text-decoration: none; color: #555;}
.box_user2 ion-item a:hover{opacity: 0.6;}
.box_user2 ion-item small{display: block; font-size: 9px; position: absolute; right: 72px; color: #808080; font-style: italic;bottom: 0;}
.box_wrap{position: relative;background: #fff;margin: 12px 12px 0; border-radius: 20px 20px 0 0; padding: 30px 12px 12px;}
.box_wrap ion-grid{margin: 0 6px;}
.box_wrap ion-row{background: #fff; border-radius: 30px;padding: 4px;}
.box_wrap .btn_submit{background: #1e1e1e; color: #fff; text-align: center; border-radius: 30px;margin: 0 12px 0 12px;}
.box_wrap .btn_submit ion-input:hover{opacity: 0.6;}
.box_wrap .input_field{color: #000;}
.remove{display: none;}
</style>

<style>
.user ion-icon{color: #555 !important;}
.car ion-icon{color: #fff !important;}
</style>