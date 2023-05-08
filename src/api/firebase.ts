import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9vz7DWdOGb2STO8llcH9WaJrVtCerfHg",
    authDomain: "kanban-board-22ff4.firebaseapp.com",
    databaseURL: "https://kanban-board-22ff4-default-rtdb.firebaseio.com",
    projectId: "kanban-board-22ff4",
    storageBucket: "kanban-board-22ff4.appspot.com",
    messagingSenderId: "643967209999",
    appId: "1:643967209999:web:28087cb6936fc594da497a"
};
  
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) 

export default db
  
