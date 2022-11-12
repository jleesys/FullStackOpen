const Notification = ({ message }) => {
    if (message?.includes('Error')) {
        var style = {
            color: 'red',
            fontStyle: 'italic',
            fontSize: '16',
            padding: '25',
            outline: '5',
            backgroundColor: 'grey'
        }
    } else {

        var style = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: '16',
            padding: '25',
            outline: '5',
            backgroundColor: 'grey'
        }
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification;