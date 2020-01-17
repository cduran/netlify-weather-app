import React, { useState } from 'react';
import { 
    Header,
    Segment,
    Container,
    Input,
    Form,
    Loader
} from 'semantic-ui-react';

import '../css/Weather.css';
import '../css/weather-icons.min.css';
import { useFetchWeather } from '../customHooks';

const Weather = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const {data, error, loading } = useFetchWeather(
        '/.netlify/functions/getWeather',
        searchValue
    );

    return (
        <Container id="main-container">
            <Segment raised>
                <Header className="ui basic segment centered">Netlify Weather App</Header>
                <Segment>
                    <Form onSubmit={() => setSearchValue(inputValue)}>
                        <Input
                            fluid
                            action="Search"
                            autoFocus
                            placeholder="e.g. Costa Rica"
                            onChange={e => setInputValue(e.target.value)}
                            value={inputValue}
                            size="large"
                        />
                        {error && <p className="w-error">Please enter a valid city name. (e.g. New York)</p>}
                    </Form>
                </Segment>
                <Segment textAlign="center">
                    {(!loading && data) ? (
                        <div>
                            <h1 className="w-h1">{data.temp} °F</h1>
                            <div>
                                <i className={`wi wi-owm-${data.weather[0].id} w-icon`}/>
                                <p className="w-p">{data.weather[0].main}</p>
                            </div>
                            <h1>{data.city}, {data.country}</h1>
                        </div>
                    ) : <Loader active inline='centered' />}
                </Segment>
            </Segment>
        </Container>
    );
};

export default Weather;
