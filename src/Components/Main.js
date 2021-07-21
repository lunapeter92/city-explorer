import React from 'react';
import axios from 'axios';
import '../css/main.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locationData: {},
            lat: '',
            long: '',
            query: '',
            map: '',
            isOpen: false,
            error: ''
        }
    }

    handleChange = (e) =>{
        this.setState({ query: e.target.value})
    }

    handleClose = () =>{
        this.setState({isOpen: false})
    }

    getData = async() => {
        const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.query}&format=json`;

        const res = await axios.get(url)
            // .catch(function(error){
            //     console.log(error)
            //     console.log(error)
            // });
        console.log(res)
        this.setState({locationData: res, lat: res.data[0].lat, long: res.data[0].lon});

        const mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${res.data[0].lat},${res.data[0].lon}&format=jpg&zoom=12&SameSite=None`
       
        this.setState({map: mapurl})


    }

   

    render() {
        return(
            <div>
                <header>
                    <h1 className="header">City Explorer</h1>
                </header>
                <div className="form">
                    <input className="input" onChange={this.handleChange} type="text" placeholder="Please enter location" />
                    <button onClick={this.getData} >Submit</button>
                </div>
                
                <Card className="card" style={{width:'18rem'}}>
                    <Card.Header>City: {this.state.query}</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Longitude: {this.state.long}</ListGroup.Item>
                        <ListGroup.Item>Latitude: {this.state.lat}</ListGroup.Item>
                    </ListGroup>
                </Card>

                <img alt="city-map" className="image" src={this.state.map}></img>
                
            </div>
            
            
        )
    }

}

export default Main;