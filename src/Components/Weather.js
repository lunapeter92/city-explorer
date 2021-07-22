import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component{
    render(){
        return(
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{this.props.name} Weather</Card.Title>
                        {/* <Card.Text>{this.props.weatherData.datetime}</Card.Text> */}
                        {/* <Card.Text>{this.props.weatherDescription}</Card.Text> */}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Weather;