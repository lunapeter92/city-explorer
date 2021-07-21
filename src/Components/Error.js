import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


class Error extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false, 
        }
    }

    handleClose = () =>{
        this.props.state()
    }


    render(){
        return(
            <div className='parent-div'>
                <Modal.Dialog show={this.props.isOpen} onHide={this.props.state}>
                <Modal.Header >
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.error}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

export default Error;