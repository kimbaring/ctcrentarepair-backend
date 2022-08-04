<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tdashboard" href="/technician/dashboard">
          <ion-icon :icon="homeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tasks" href="/technician/tasks">
          <ion-icon :icon="buildOutline" />
        </ion-tab-button>
        <ion-tab-button tab="ttransactionhistory" href="">
          <span class="notif" v-if="counter > 0">1</span>
          <ion-icon :icon="timeOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tprofile" href="/technician/profile">
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
import { personCircleOutline, timeOutline, homeOutline,buildOutline } from 'ionicons/icons';
// import { local } from '@/functions';
// import { getChild, onDelete,ref,query, getDatabase, orderByChild, equalTo, get, onValue } from '@/firebase';

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
      buildOutline,
      counter: 0
    }
  },
  created(){
    // console.log(this.counter);
    // const db = getDatabase();
    // const que = query(ref(db,'/pending_tasks'),orderByChild('user_id'), equalTo(local.get('user_id')));
    // get(que).then(snapshot=>{
    //     if(snapshot.exists()) for(let snap in snapshot.val()) this.counter++;
    // });

    // onValue(ref(db), snapshot=>{
    //   console.log(snapshot.val());
    //   if(snapshot.user_id == local.get('user_id')){
    //     get(que).then(snapshot=>{
    //       this.counter = 0;
    //         if(snapshot.exists()) for(let snap in snapshot.val()) this.counter++;
    //     });
    //   }
    // });
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
