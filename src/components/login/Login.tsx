import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { authorize } from "../../store/slice/appSlice"
import './Login.css'

const Login: React.FC = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const logIn = () => {
        dispatch(authorize({
            isAuthorized: true,
            username: username
        }))
    }

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__title">Kanban Board</div>

                <div className="login__form">
                    <div className='input'>
                        <label className='input__label'>Username</label>
                        <input type='text' className='input__input' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='input'>
                        <label className='input__label'>Password</label>
                        <input type='password' className='input__input' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="login__buttons">
                        <button className='button button--primary' disabled={!username.length || !password.length} onClick={logIn}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login