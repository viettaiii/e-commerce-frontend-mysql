import { Button } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Button variant="primary btn-xs">Primary</Button>{" "}
      <Button variant="secondary  btn-sm">Secondary</Button>{" "}
      <Button variant="success  btn-md">Success</Button>{" "}
      <Button variant="warning  btn-lg">Warning</Button>{" "}
      <Button variant="danger">Danger</Button>{" "}
      <Button variant="info">Info</Button>{" "}
      <Button variant="light">Light</Button>{" "}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
      <Button variant="outline-primary">Primary</Button>{" "}
      <Button variant="outline-secondary">Secondary</Button>{" "}
      <Button variant="outline-success">Success</Button>{" "}
      <Button variant="outline-warning">Warning</Button>{" "}
      <Button variant="outline-danger">Danger</Button>{" "}
      <Button variant="outline-info">Info</Button>{" "}
      <Button variant="outline-light">Light</Button>{" "}
      <Button variant="outline-dark">Dark</Button>
    </div>
  );
}

export default App;
