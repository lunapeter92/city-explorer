import React from 'react';
import { Card } from 'react-bootstrap';



class Movie extends React.Component {

    render(){
        return(
            <div className="movie-card">
                
                <Card style={{width: '18 rem'}} className='movie'>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.overview}</Card.Text>
                </Card>
            </div>
        )
    }
}

export default Movie;