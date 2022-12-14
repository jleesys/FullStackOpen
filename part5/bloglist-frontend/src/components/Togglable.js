import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [formVisible, setFormVisible] = useState(false);
    const showWhenFormVis = { display: formVisible ? '' : 'none' };
    const showWhenFormInvis = { display: formVisible ? 'none' : '' };

    const toggleVisible = () => {
        setFormVisible(!formVisible);
    }

    useImperativeHandle(refs, () => {
        return {
           toggleVisible 
        }
    })

    return (
        <div>
            <button style={showWhenFormInvis}
                onClick={toggleVisible}>{props.buttonLabel}</button>
            <div style={showWhenFormVis}>
                {props.children}
                <button style={showWhenFormVis}
                    onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable;