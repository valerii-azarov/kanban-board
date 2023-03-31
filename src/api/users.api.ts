import { doc, getDoc, setDoc } from 'firebase/firestore'
import db from './firebase'

const UsersAPI = {
    loadUsers: async () => {
        const document = await getDoc(doc(db, 'data', 'kanban-board-data'))
        return document.data()?.users
    },
}

export default UsersAPI