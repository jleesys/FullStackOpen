import { useState } from 'react'

const Togglable = (props) => {
    const [formVisible, setFormVisible] = useState(false);
    const showWhenFormVis = { display: formVisible ? '' : 'none' };
    const showWhenFormInvis = { display: formVisible ? 'none' : '' };
    return (
        <div>
            <button style={showWhenFormInvis}
                onClick={() => setFormVisible(true)}>{props.buttonLabel}</button>
            <div style={showWhenFormVis}>
                {props.children}
                <button style={showWhenFormVis}
                    onClick={() => setFormVisible(false)}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable;