import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { AppUser } from '../interfaces/app-user.interface'
import { BoardCard } from '../interfaces/board-card.interface'
import db from './firebase'

const CardsAPI = {
    loadCards: async () => {
        const document = await getDoc(doc(db, 'data', 'kanban-board-data'))
        return document.data()?.cards
    },
    saveCards: async (cards: BoardCard[], users: AppUser[]) => {
        return await updateDoc(doc(db, 'data', 'kanban-board-data'), {cards, users})        
    },
}

export default CardsAPI