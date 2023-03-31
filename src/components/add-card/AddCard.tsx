import React, { useRef, useState } from 'react'
import './AddCard.css'
import {v4} from 'uuid'
import { BoardCard, BoardCardStatus } from '../../interfaces/board-card.interface'

interface AddCardProps {
    onAddClick: (card: BoardCard) => void
    onCancelClick: () => void
    status: BoardCardStatus
    users: string[]
}

const AddCard: React.FC<AddCardProps> = ({ onAddClick, onCancelClick, status, users }) => {

    const newCardId = useRef(v4())

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState<string>()

    const addCard = () => {
        const id = newCardId.current
        onAddClick({
            id,
            title,
            description,
            username,
            status
        })
    }

    return (
        <div className='add-card'>
            <div className='add-card__container'>
                <div className='add-card__title'>Add new card</div>
                <div className='add-card__hint'>Please provide the details for the new card. All fields are required.</div>
                
                <div className='input'>
                    <label className='input__label'>Title</label>
                    <input type='text' className='input__input' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='input'>
                    <label className='input__label'>Description</label>
                    <textarea className='input__input' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className='input'>
                    <label className='input__label'>Assigned to</label>
                    <select className='input__input' value={username} onChange={(e) => setUsername(e.target.value)}>
                        <option value=''>None</option>
                        { users.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                <div className='add-card__buttons'>
                    <button className='button button--primary' onClick={addCard}>
                        <i className='fa fa-plus'></i>
                        Add
                    </button>

                    <button className='button button--secondary' onClick={onCancelClick}>
                        Cancel
                    </button>
                </div>
                

            </div>
        </div>
    )
}

export default AddCard
