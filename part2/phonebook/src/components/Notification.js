import { getQueriesForElement } from "@testing-library/react";

const Notification = ({ message }) => {
    var style = {
        // color: 'red',
        fontStyle: 'italic',
        fontSize: 16,
        padding: 25,
        borderWidth: 5,
        borderStyle: 'solid',
        // borderColor: 'red',
        height: 20
    }
    if (message?.includes('Error')) {
        style = {
            ...style,
            color: 'red',
            borderColor: 'red'
        }
        // var style = {
        //     color: 'red'st,
        //     fontStyle: 'italic',
        //     fontSize: 16,
        //     padding: 25,
        //     borderWidth: 5,
        //     borderStyle: 'solid',
        //     borderColor: 'red',
        //     height: 20
        // }
    } else {
        style = {
            ...style,
            color: 'green',
            bordercolor: 'green'
        }
        // var style = {
        //     color: 'green',
        //     fontStyle: 'italic',
        //     fontSize: 16,
        //     padding: 25,
        //     borderWidth: 5,
        //     borderStyle: 'solid',
        //     borderColor: 'green',
        //     height: 20
        // }
    }

    return (
        <div style={message ? style : null}>
            {message}
        </div>
    )
}

export default Notification;