import { useState } from 'react';

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = (e) => {
        e.preventDefault();
        setVisible(!visible);
    }

    const showWithForm = { display: visible ? '' : 'none'};
    const showWithoutForm = { display: visible ? 'none' : ''};

    return (
        <div>
            <button onClick={toggleVisible}> {visible ? 'Close Form' : props.buttonText}</button>
            <div style={showWithForm} >
                {props.children}
            </div>
        </div>
    );
}

export default Togglable;