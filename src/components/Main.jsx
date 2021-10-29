import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultCityAction, addCityToFavoritesAction } from "../actions";
import {
  Col,
  Card,
  Container,
  Row,
  Nav,
  Dropdown,
  FormControl,
  InputGroup,
  DropdownButton,
  Button,
  Carousel,
} from "react-bootstrap";

const Main = () => {
  const name = useSelector((state) => state.user.username);
  const defaultCity = useSelector((state) => state.user.defaultCity);
  const favorites = useSelector((state) => state.user.favorites);
  const [coordsObj, setCoordsObj] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);
  const [city, setCity] = useState("Dublin");
  const [time, setTime] = useState("today");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const dispatch = useDispatch();

  const getWeatherCoords = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=622e478403a72ca161be9811cdcc6df5&units=metric`
      );
      // console.log(response);
      let fetchedCoords = await response.json();
      setCoordsObj(fetchedCoords);
      console.log(coordsObj);
      console.log(coordsObj.coord.lat.toString());
      // setLat(coordsObj.coord.lat.toString());
      // setLon(coordsObj.coord.lon.toString());
      if (response.ok) {
        let response3 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coordsObj.coord.lat.toString()}&lon=${coordsObj.coord.lon.toString()}&exclude=minutely&appid=622e478403a72ca161be9811cdcc6df5&units=metric`
        );
        let fetchedWeather = await response3.json();
        setWeatherObj(fetchedWeather);
        console.log(weatherObj);
        console.log(weatherObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherCoords();
  }, [time, defaultCity]);

  // const hourlyCarousel = (array) => {
  //   let hourSections = [];

  //   let hours1 = array.slice(0, 6);
  //   hourSections.push(hours1);
  //   let hours2 = array.slice(6, 13);
  //   hourSections.push(hours2);
  //   let hours3 = array.slice(13, 20);
  //   hourSections.push(hours3);
  //   let hours4 = array.slice(20, 27);
  //   hourSections.push(hours4);
  //   let hours5 = array.slice(27, 34);
  //   hourSections.push(hours5);
  //   let hours6 = array.slice(34, 41);
  //   hourSections.push(hours6);
  //   let hours7 = array.slice(41, 48);
  //   hourSections.push(hours7);

  //   hourSections.map((eachArray) => {
  //     return (
  //       <Carousel.Item>
  //         <Row>
  //           {eachArray.map((hour) => {
  //             return (
  //               <Col xs={2} className="mt-1">
  //                 <div>Visibility: {hour.visibility}</div>
  //                 <div>Pressure {hour.pressure}</div>
  //                 <div>Temperature {hour.temp}</div>
  //               </Col>
  //             );
  //           })}
  //         </Row>
  //       </Carousel.Item>
  //     );
  //   });
  // };

  return (
    <Container>
      <Row>
        <Col xs={9}>
          {coordsObj ? (
            <Card>
              <Card.Header>
                <h1>Umbrellator</h1>
                <h2>
                  Hi {name}, today in {defaultCity} it is {coordsObj.main.temp}C
                </h2>
                <Nav variant="tabs" defaultActiveKey="#first">
                  <Nav.Item>
                    <Nav.Link onClick={() => setTime("today")}>Today</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setTime("hourly")}>
                      Hourly
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setTime("weekly")}>
                      Weekly
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Card.Title>Currently in {coordsObj.name} </Card.Title>
                <Card.Text>
                  <Col>
                    <div> {coordsObj.weather[0].main}</div>
                    {/* <div> {coordsObj.weather[0].description}</div> */}
                    <div>Temp {coordsObj.main.temp}C</div>
                    <div>Min {coordsObj.main.temp_min}C</div>
                    <div>Max {coordsObj.main.temp_max}C</div>
                    <div>Humidity {coordsObj.main.humidity}</div>
                  </Col>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            console.log("No coords object")
          )}
          {weatherObj ? (
            <Card.Body>
              <Card.Text>
                <Row>
                  {time === "weekly"
                    ? weatherObj.daily.map((day) => (
                        // <Col xs={2} className="my-3">
                        <Card border="primary">
                          <Card.Header>
                            <strong>{day.dt}</strong>
                          </Card.Header>
                          <Card.Body>
                            {/* <Card.Title>Primary Card Title</Card.Title> */}
                            <Card.Text className="text-align-left">
                              <div>Visibility: {day.visibility}</div>
                              <div>Pressure {day.pressure}</div>
                              <div>Temperature {day.temp.day}</div>
                              <div>Visibility {day.visibility}</div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        // </Col>
                      ))
                    : time === "hourly"
                    ? // ? (
                      // <Carousel>{hourlyCarousel(weatherObj.hourly)}</Carousel>
                      //
                      weatherObj.hourly.map((hour) => (
                        <Col xs={2} className="my-3">
                          <Card border="primary">
                            <div>
                              {" "}
                              <strong>{hour.dt}</strong>
                            </div>
                            <div>Visibility: {hour.visibility}</div>
                            <div>Pressure {hour.pressure}</div>
                            <div>Temperature {hour.temp}</div>{" "}
                          </Card>
                        </Col>
                      ))
                    : time === "weekly"
                    ? console.log("weekly")
                    : console.log("today")}
                </Row>
              </Card.Text>
            </Card.Body>
          ) : (
            console.log("No wearher object")
          )}
        </Col>
        <Col xs={3}>
          <Card border="danger" style={{ width: "18rem" }}>
            <Card.Header>Favorite Cities</Card.Header>
            <Card.Body>
              <Card.Text>
                {favorites.map((city) => (
                  <div>
                    <h3
                      className="pointerCity"
                      onClick={() => dispatch(setDefaultCityAction(city))}
                    >
                      {city}
                    </h3>
                  </div>
                ))}

                <div>
                  <h3
                    className="pointerCity"
                    onClick={() => dispatch(setDefaultCityAction("Berlin"))}
                  >
                    Berlin
                  </h3>
                </div>
                <div>
                  <h3
                    className="pointerCity"
                    onClick={() => dispatch(setDefaultCityAction("London"))}
                  >
                    London
                  </h3>
                </div>
                <div>
                  <h3
                    className="pointerCity"
                    onClick={() => dispatch(setDefaultCityAction("Paris"))}
                  >
                    Paris
                  </h3>
                </div>
                <div>
                  <h3
                    className="pointerCity"
                    onClick={() => dispatch(setDefaultCityAction("Copenhagen"))}
                  >
                    Copenhagen
                  </h3>
                </div>
                <div>
                  <h3
                    className="pointerCity"
                    onClick={() => dispatch(setDefaultCityAction("Hell"))}
                  >
                    Hell
                  </h3>
                </div>
              </Card.Text>
            </Card.Body>
            <FormControl
              onChange={(e) =>
                dispatch(addCityToFavoritesAction(e.target.value))
              }
              placeholder="Add City"
              aria-label="Add City"
              aria-describedby="basic-addon2"
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
