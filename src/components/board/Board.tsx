import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CardsAPI from '../../api/cards.api'
import { BoardCard, BoardCardStatus } from '../../interfaces/board-card.interface'
import { AppDispatch, RootState } from '../../store'
import { addCard, deleteCard, loadCardsState, saveCardsState, setCardStatus, updateCard } from '../../store/slice/boardSlice'
import { loadUsersState } from '../../store/slice/usersSlice'
import { DONE_COLOR, IN_PROGRESS_COLOR, TODO_COLOR } from '../../utils/constants'
import AddCard from '../add-card/AddCard'
import BoardColumn from '../board-column/BoardColumn'
import Card from '../card/Card'
import EditCard from '../edit-card/EditCard'
import Loading from '../loading/Loading'
import './Board.css'

const Board: React.FC = () => {

    const isLoading = useSelector((state:RootState) => state.board.isLoading)
    const cards = useSelector((state: RootState) => state.board.cards)
    const users = useSelector((state: RootState) => state.users.users).map((u) => u.username)
    const dispatch = useDispatch<AppDispatch>()
    
    const [addCardModalOpened, setAddCardModalOpened] = useState(false)
    const [cardToUpdate, setCardToUpdate] = useState<BoardCard | null>(null)
    const [addCardStatus, setAddCardStatus] = useState<BoardCardStatus>('todo')
    
    const todoCards = cards.filter(c => c.status === 'todo')
    const inProgressCards = cards.filter(c => c.status === 'inprogress')
    const doneCards = cards.filter(c => c.status === 'done')

    useEffect(() => {
        dispatch(loadCardsState())
        dispatch(loadUsersState())
    }, [])

    const syncCardState = () => {
        setTimeout(() => {
            dispatch(saveCardsState())
        }, 10)
    }

    const updateCardStatus = (card: BoardCard, status: BoardCardStatus) => {
        dispatch(setCardStatus({
            card,
            status
        }))

        syncCardState()
    }

    const addNewCard = (card: BoardCard) => {
        dispatch(addCard(card))
        setAddCardModalOpened(false)

        syncCardState()
    }

    const saveCard = (card: BoardCard) => {
        dispatch(updateCard(card))
        setCardToUpdate(null)

        syncCardState()
    }

    const onDeleteCard = () => {
        if (!cardToUpdate) return
        dispatch(deleteCard(cardToUpdate))
        setCardToUpdate(null)

        syncCardState()
    }

    const openAddCardDialog = (status: BoardCardStatus) => {
        setAddCardStatus(status)
        setAddCardModalOpened(true)
    }

    return (
        <div className='board'>
            <BoardColumn
                title={'TODO'}
                color={TODO_COLOR}
                onAddClick={() => openAddCardDialog('todo')}
            >
                {
                    todoCards.map(c => 
                        (<Card
                            key={c.id}
                            title={c.title}
                            description={c.description}
                            username={c.username}
                            canMoveRight={true}
                            onCardClick={() => setCardToUpdate(c)}
                            onMoveRight={() => updateCardStatus(c, 'inprogress')}
                        />)
                    )
                }
            </BoardColumn>

            <BoardColumn
                title={'In Progress'}
                color={IN_PROGRESS_COLOR}
                onAddClick={() => openAddCardDialog('inprogress')}
            >
                {
                    inProgressCards.map(c => 
                        (<Card
                            key={c.id}
                            title={c.title}
                            description={c.description}
                            username={c.username}
                            canMoveLeft={true}
                            canMoveRight={true}
                            onCardClick={() => setCardToUpdate(c)}
                            onMoveLeft={() => updateCardStatus(c, 'todo')}
                            onMoveRight={() => updateCardStatus(c, 'done')}
                        />)
                    )
                }
            </BoardColumn>

            <BoardColumn
                title={'Done'}
                color={DONE_COLOR}
                noBorder={true}
                onAddClick={() => openAddCardDialog('done')}
            >
                {
                    doneCards.map(c => 
                        (<Card
                            key={c.id}
                            title={c.title}
                            description={c.description}
                            username={c.username}
                            onCardClick={() => setCardToUpdate(c)}
                            canMoveLeft={true}
                            onMoveLeft={() => updateCardStatus(c, 'inprogress')}
                        />)
                    )
                }
            </BoardColumn>
            
            {addCardModalOpened && <AddCard 
                onAddClick={addNewCard}
                onCancelClick={() => setAddCardModalOpened(false)}
                status={addCardStatus}
                users={users}
            />}

            {
                cardToUpdate && <EditCard 
                    card={cardToUpdate}
                    onDeleteClick={onDeleteCard}
                    onSaveClick={saveCard}
                    onCancelClick={() => setCardToUpdate(null)}
                    users={users}
                />
            }

            { isLoading && <Loading /> }
        </div>
    )
}

export default Board