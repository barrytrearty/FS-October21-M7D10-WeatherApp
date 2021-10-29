import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  FormControl,
  InputGroup,
  DropdownButton,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDefaultCityAction, setUsernameAction } from "../actions";
import { withRouter } from "react-router";

const Main = ({ history }) => {
  const [userName, setUserName] = useState("");
  const [defaultCity, setDefaultCity] = useState("Dublin");

  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setUsernameAction(userName));
    dispatch(setDefaultCityAction(defaultCity));
    history.push("/main");
  };

  return (
    <Container>
      <Row>
        <h1>Umbrellator</h1>
      </Row>
      <Row>
        <Col xs={6}>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title={defaultCity}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item onClick={() => setDefaultCity("Dublin")}>
                Dublin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDefaultCity("New York")}>
                New York
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDefaultCity("Berlin")}>
                Berlin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDefaultCity("Las Vegas")}>
                Las Vegas
              </Dropdown.Item>

              <Dropdown.Item onClick={() => setDefaultCity("Berlin")}>
                Berlin
              </Dropdown.Item>
            </DropdownButton>
            <FormControl
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Main);
