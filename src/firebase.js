// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIGx9ZWIQx0EH_SnS534AZlTQP-bdgpNA",
  authDomain: "rentarepair-b1f2d.firebaseapp.com",
  databaseURL: "https://rentarepair-b1f2d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rentarepair-b1f2d",
  storageBucket: "rentarepair-b1f2d.appspot.com",
  messagingSenderId: "813302972394",
  appId: "1:813302972394:web:9650e8c94a1e82a9d07c93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
function pull(path){return ref(db,path);}
function push(path,value){
    const reference = pull(path);
    set(reference,value);
    return ref(db,path);
}



export default app;
export {
    db,
    pull,
    push,
};