import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const FIELDS = { NAME: 'name', ROOM: 'room' }

const Main = () => {
    const { NAME, ROOM } = FIELDS

    const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' })

    const handleChange = ({ target: { name, value } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleClick = (e) => {
        const isDisabled = Object.values(values).some((value) => !value)

        if (isDisabled) e.preventDefault()
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[600px] h-[300px] bg-slate-400 rounded">
                <form className="w-[40%] mx-auto h-full flex flex-col justify-center gap-4">
                    <h1 className="text-white font-bold text-2xl text-center">
                        Join Room
                    </h1>
                    <input
                        type="text"
                        name="name"
                        value={values[NAME]}
                        placeholder="Name..."
                        className="outline-none p-1 rounded"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="room"
                        value={values[ROOM]}
                        placeholder="Room..."
                        className="outline-none p-1 rounded"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <Link
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                        onClick={handleClick}
                    >
                        <button
                            type="submit"
                            className="w-full outline-none p-1 rounded bg-teal-500 font-medium text-white"
                        >
                            Sign In
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Main
