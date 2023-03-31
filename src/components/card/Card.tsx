import React, { useEffect, useRef } from "react";
import './Card.css'

interface CardProps {
    title: string;
    description: string;
    username?: string;
    canMoveRight?: boolean;
    canMoveLeft?: boolean;
    onCardClick?: () => void;
    onMoveLeft?: () => void;
    onMoveRight?: () => void;
}

const Card: React.FC<CardProps> = ({
    title, 
    description, 
    username, 
    canMoveRight = false, 
    canMoveLeft = false, 
    onMoveLeft, 
    onMoveRight,
    onCardClick
}) => {

    const handleMoveLeft = (e: React.MouseEvent): void => {
        e.stopPropagation();
        onMoveLeft && onMoveLeft()
    }

    const handleMoveRight = (e: React.MouseEvent): void => {
        e.stopPropagation();
        onMoveRight && onMoveRight()
    }

    return (
        <div className="card" onClick={onCardClick}>
            <div className="card__title">{title}</div>
            <div className="card__description">{description}</div>
            <div className="card__controls">
                {
                    canMoveLeft && <button className='card__button' onClick={handleMoveLeft}>
                                        <i className="fa fa-angle-left card__button-icon"></i>
                                    </button>
                }
                {
                    canMoveRight && <button className='card__button' onClick={handleMoveRight}>
                                        <i className="fa fa-angle-right card__button-icon"></i>
                                    </button>
                }
            </div>

            <div className="card__assigned-to">{username ? `Assigned to: ${username}` : 'Not assigned'}</div>
        </div>
    )
}

export default Card