<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/customer/dashboard">
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="transactionhistory" href="/customer/transactionhistory">
          <span class="notif" v-if="counter > 0">{{counter}}</span>
          <ion-icon :icon="timeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/customer/profile">
          <ion-icon :icon="personCircleOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  } from '@ionic/vue';
import { personCircleOutline, timeOutline, homeOutline } from 'ionicons/icons';
import { local } from '@/functions';
import { db } from '@/firebase';
import {ref,query, orderByChild, equalTo, get, onValue} from 'firebase/database';

export default({
  name: 'TabsPage',
  components: { IonTabBar,
    IonTabButton,
    IonTabs,
    IonIcon,
    IonPage,
    IonRouterOutlet
},
  data() {
    return {
      personCircleOutline,
      timeOutline,
      homeOutline,

      counter: null
    }
  },
  created(){
    const que = query(ref(db,'/pending_tasks'),orderByChild('user_id'), equalTo(local.get('user_id')));

    onValue(ref(db,'/pending_tasks'), ()=>{
      this.counter = 0;
      let keys = [];
      get(que).then(snapshot=>{
          if(snapshot.exists()) for(let snap in snapshot.val()) keys.push(snap);
          this.counter = keys.length;
      });
    });
  }
});
</script>
<style scoped>
ion-tab-bar{
    background: var(--ion-color-light-contrast);
}
ion-tab-button{
    --background-focused: var(--ion-color-secondary-contrast);
    background: var(--ion-color-light-contrast);
    --color-selected: var(--ion-color-secondary-contrast);
}

ion-router-outlet{overflow-y: scroll;}

.notif{
  position: absolute;
  right: 30px;
  top: 5px;
  background: #b7160b;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}

</style>
