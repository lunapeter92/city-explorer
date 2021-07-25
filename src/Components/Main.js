import React from 'react';
import axios from 'axios';
import '../css/main.css';
import Card from 'react-bootstrap/Card';
import Weather from './Weather'
import ListGroup from 'react-bootstrap/ListGroup';
import Movie from './Movie';
import { getByTitle } from '@testing-library/react';


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
            error: '',
            weather: [],
            movies: []
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

        const weatherUrl = `https://ceapi.herokuapp.com/`
        const response = await axios.get(`${weatherUrl}/weather`, {params: {searchQuery: this.state.query, lon: this.state.long, lat: this.state.lat}});
        // console.log('response: ', response)
        
        this.setState({weather: response.data[0]})
        console.log('Weather', this.state.weather)

        const movieUrl = `https://ceapi.herokuapp.com/movie`;
        const movieRes = await axios.get(`${movieUrl}`, {params: {searchQuery: this.state.query}});
        console.log(movieRes)
        let movieArr = movieRes.data.map(item => {
           return item;
        })
        this.setState({movies: movieArr})
        console.log(this.state.movies)
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

               {this.state.map && <img alt="city-map" className="image" src={this.state.map}></img>}

               {this.state.weather && <Weather datetime={this.state.weather.date} description={this.state.weather.description} />}
                <h3>Movies</h3>
               {this.state.movies && this.state.movies.map((item, idx) =>{
                   return <Movie title={item.title} overview={item.overview} key={idx}/>
               })}


            </div>
            
            
        )
    }

}

export default Main;