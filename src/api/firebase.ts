import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYF9WsOF8_KITi85FbwsWuf4BskRgAzCs",
    authDomain: "test-kanban-board.firebaseapp.com",
    projectId: "test-kanban-board",
    storageBucket: "test-kanban-board.appspot.com",
    messagingSenderId: "197607152214",
    appId: "1:197607152214:web:a895185dff16e3602f79f7",
    measurementId: "G-D59GZ73DCR"
};
  
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) 

export default db
  
