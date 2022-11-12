import { getQueriesForElement } from "@testing-library/react";

const Notification = ({ message }) => {
    if (message?.includes('Error')) {
        var style = {
            color: 'red',
            fontStyle: 'italic',
            fontSize: 16,
            padding: 25,
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: 'red',
            backgroundColor: 'grey',
            height: 20 
        }
    } else {

        var style = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16,
            padding: 25,
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: 'green',
            backgroundColor: 'grey',
            height: 20 
        }
    }

    return (
        <div style={message ? style : null}>
            {message}
        </div>
    )
}

export default Notification;