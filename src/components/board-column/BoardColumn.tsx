import React from "react";
import './BoardColumn.css'
import cn from 'classnames'

interface BoardColumnProps  {
    title: string;
    color: string;
    noBorder?: boolean;
    children?: React.ReactNode;
    onAddClick?: () => void
}

const BoardColumn: React.FC<BoardColumnProps> = ({ title, color, noBorder = false, children, onAddClick }) => {
    return (
        <div 
            className={cn('board-column', { 'board-column--no-border': noBorder } )}>
            <div className='board-column__title'
                style={{borderColor: color}}
            >{title}</div>
            
            <div className='board-column__controls'>
                <button className="board-column__button" onClick={onAddClick}>
                    <i className="fa fa-plus board-column__button-icon"></i>
                </button>
            </div>

            <div className="board-column__cards">
                {children && children }
            </div>
        </div>
    )
}

export default BoardColumn