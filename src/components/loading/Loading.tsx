import React from 'react'
import './Loading.css'

const Loading: React.FC = () => {
    return (
        <div className='loading'>
            <i className='fa fa-spinner'></i>
            Loading board..
        </div>
    )
}

export default Loading