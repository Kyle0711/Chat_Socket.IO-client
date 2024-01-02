import React from 'react'

const Messages = ({ messages, name }) => {
    return (
        <div className="w-full h-[82%] bg-gray-700">
            <div className="w-full h-full flex flex-col gap-1 p-4 overflow-auto">
                {messages?.map(({ user, message }, index) => {
                    const itsMe =
                        user.name.toLowerCase() ===
                        `${name}`.trim().toLowerCase()
                    return (
                        <div
                            key={index}
                            className={`max-w-[30%] flex flex-col items-start ${
                                itsMe && 'self-end'
                            }`}
                        >
                            <span className="text-stone-500">{user.name}</span>
                            <div
                                className={`p-2 text-white rounded ${
                                    itsMe ? 'bg-blue-700' : 'bg-gray-800'
                                }`}
                            >
                                {message}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Messages
