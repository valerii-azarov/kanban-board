import React, { useRef, useState } from 'react'
import './EditCard.css'
import { BoardCard, BoardCardStatus } from '../../interfaces/board-card.interface'

interface EditCardProps {
    onSaveClick: (card: BoardCard) => void
    onDeleteClick: () => void
    onCancelClick: () => void
    card: BoardCard
    users: string[]
}

const EditCard: React.FC<EditCardProps> = ({ onSaveClick, onCancelClick, onDeleteClick, card, users }) => {

    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description)
    const [cardStatus, setCardStatus] = useState(card.status)
    const [username, setUsername] = useState(card.username)

    const saveCard = () => {
        const id = card.id
        onSaveClick({
            id,
            title,
            description,
            username,
            status: cardStatus
        })
    }

    return (
        <div className='edit-card'>
            <div className='edit-card__container'>
                <div className='edit-card__title'>Update card</div>
                
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

                <div className='input'>
                    <label className='input__label'>Status</label>
                    <select className='input__input' value={cardStatus} onChange={(e) => setCardStatus(e.target.value as BoardCardStatus)}>
                        <option value='todo'>TODO</option>
                        <option value='inprogress'>In progress</option>
                        <option value='done'>Done</option>
                    </select>
                </div>

                <div className='edit-card__buttons'>
                    <button className='button button--primary' onClick={saveCard}>
                        <i className='fa fa-save'></i>
                        Save
                    </button>

                    <button className='button button--alert' onClick={onDeleteClick}>
                        <i className='fa fa-trash'></i>
                        Delete
                    </button>

                    <button className='button button--secondary' onClick={onCancelClick}>
                        Cancel
                    </button>

                    
                </div>
                

            </div>
        </div>
    )
}

export default EditCard
