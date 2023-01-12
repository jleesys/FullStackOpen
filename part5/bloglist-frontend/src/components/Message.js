import { useState, useImperativeHandle, forwardRef } from 'react'

const Message = forwardRef((props, refs) => {
    // if (text === null || text === '') {
    //     return (
    //         <div>
    //         </div>
    //     )
    // }
    const [message, setMessage] = useState('');

    const setMessageText = (text) => {
        // console.log('setting message to ', text)
        setMessage(text);
    }

    useImperativeHandle(refs, () => {
        return {
            setMessageText
        }
    })

    if (message === null || message === '') {
        return (
            <div>
            </div>
        )
    }


    var styleError = {
        color: 'red',
        fontWeight: 700,
        borderWidth: 5,
        padding: 15,
        marginBottom: '7px',
        borderStyle: 'solid',
        borderColor: 'red'
    }
    var styleNotification = {
        // color: 'green',
        // fontWeight: 700
        ...styleError, color: 'green',
        borderColor: 'green'
    }

    if (message.toLowerCase().includes('success')) {
        return (
            <div style={styleNotification}>
                {message}
            </div>
        )
    }
    return (
        <div style={styleError}>
            {message}
        </div>
    )
})

export default Message;