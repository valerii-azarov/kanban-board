import React from 'react'
import { useDispatch } from 'react-redux';
import { authorize } from '../../store/slice/appSlice';
import './Header.css'

interface HeaderProps {
    title: string;
    username: string;
}

const Header: React.FC<HeaderProps> = (props) => {

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(authorize({
            isAuthorized: false
        }))
    }

    return (
        <div className='header'>
            <div className='header__title'>{props.title}</div>
            <div className='header__username'>
                Welcome, {props.username}
                <a className='header__link' onClick={logout}>Logout</a>
            </div>
            
        </div>
    )
}

export default Header