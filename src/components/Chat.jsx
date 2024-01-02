import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'

import Messages from './Messages'

import EmojiPicker from 'emoji-picker-react'

import icon from '../images/free-icon-smiling-face-10963285.png'

const socket = io.connect('http://localhost:5000')

const Chat = () => {
    const [state, setState] = useState([])
    const { search } = useLocation()
    const navigate = useNavigate()
    const [params, setParams] = useState({ name: '', room: '' })
    const [message, setMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState(0)

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        console.log(searchParams)
        setParams(searchParams)
        socket.emit('join', searchParams)
    }, [search])

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((prev) => [...prev, data])
        })
    }, [])

    useEffect(() => {
        socket.on('joinRoom', ({ data: { users } }) => {
            setUsers(users.length)
        })
    }, [])

    const leftRoom = () => {
        socket.emit('leftRoom', { params })
        navigate('/')
    }

    const handleChange = ({ target: { value } }) => setMessage(value)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) return

        socket.emit('sendMessage', { message, params })

        setMessage('')
    }

    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`)

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[80%] h-[90%]">
                <div className="w-full h-[10%] bg-gray-800">
                    <div className="w-full h-full flex justify-between items-center px-10">
                        <h1 className="text-white font-bold text-2xl">
                            {params.room}
                        </h1>
                        <div className="text-white">{users} users in room</div>
                        <button
                            className="font-medium text-white bg-red-700 p-2 rounded"
                            onClick={leftRoom}
                        >
                            Left the room
                        </button>
                    </div>
                </div>
                <Messages messages={state} name={params.name} />
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full h-[8%] bg-gray-800 relative"
                    method="post"
                >
                    <input
                        type="text"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        className="w-full h-full outline-none bg-inherit px-10 text-white"
                        placeholder="Enter your message..."
                        autoComplete="off"
                        required
                    />
                    <div className="absolute h-[30%] top-[50%] translate-y-[-50%] right-[160px]">
                        <img
                            src={icon}
                            alt=""
                            className="h-full cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        />

                        {isOpen && (
                            <div className="absolute bottom-[50%] right-[50%]">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>
                    <input
                        type="submit"
                        onClick={handleSubmit}
                        className="h-full mx-10 text-white absolute right-0"
                    />
                </form>
            </div>
        </div>
    )
}

export default Chat
