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

const FavoriteCities = () => {
  const favorites = useSelector((state) => state.user.favorites);
  const [cityToAdd, setCityToAdd] = useState("");
  const dispatch = useDispatch();

  const handleAddCity = () => {
    dispatch(addCityToFavoritesAction(cityToAdd));
    document.getElementById("formInput").value = "";
  };

  return (
    <Card border="danger">
      <Card.Header>Favorite Cities</Card.Header>
      <Card.Body>
        <Card.Text>
          {favorites &&
            favorites.map((city) => (
              <div>
                <h3
                  className="pointerCity"
                  onClick={() => dispatch(setDefaultCityAction(city))}
                >
                  {city}
                </h3>
              </div>
            ))}
        </Card.Text>
      </Card.Body>
      <FormControl
        id="formInput"
        onChange={(e) => setCityToAdd(e.target.value)}
        placeholder="Add City"
        aria-label="Add City"
        aria-describedby="basic-addon2"
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={() => handleAddCity()}
      >
        Choose City
      </Button>
    </Card>
  );
};

export default FavoriteCities;
