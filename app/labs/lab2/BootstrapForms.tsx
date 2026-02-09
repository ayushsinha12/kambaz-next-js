"use client";

import {
  FormLabel,
  FormControl,
  FormCheck,
  InputGroup,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div>
      {/* 2.3.10 Styling Forms */}
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>

        <FormLabel>Email address</FormLabel>
        <FormControl type="email" placeholder="name@example.com" />

        <FormLabel>Example textarea</FormLabel>
        <FormControl as="textarea" rows={3} />
      </div>

      {/* 2.3.12 Styling Switches */}
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>

        <FormCheck
          type="switch"
          defaultChecked={false}
          label="Unchecked switch checkbox input"
        />

        <FormCheck
          type="switch"
          defaultChecked={true}
          label="Checked switch checkbox input"
        />

        <FormCheck
          type="switch"
          defaultChecked={false}
          label="Unchecked disabled switch checkbox input"
          disabled
        />

        <FormCheck
          type="switch"
          defaultChecked={true}
          label="Checked disabled switch checkbox input"
          disabled
        />
      </div>

      {/* 2.3.13 Styling Range and Sliders */}
      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>

        <FormLabel>Example range</FormLabel>
        <FormControl type="range" min={0} max={5} step={0.5} />
      </div>

      {/* 2.3.14 Styling Addons */}
      <div id="wd-css-styling-addons">
        <h3>Addons</h3>

        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <FormControl />
        </InputGroup>

        <InputGroup>
          <FormControl />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      {/* 2.4.15 Styling Responsive Forms */}
      <div id="wd-css-responsive-forms-1">
        <h3>Responsive forms</h3>

        <Row className="mb-3" controlId="email1">
          <FormLabel column sm={2}>
            Email
          </FormLabel>
          <Col sm={10}>
            <FormControl type="email" defaultValue="email@example.com" />
          </Col>
        </Row>

        <Row className="mb-3" controlId="password1">
          <FormLabel column sm={2}>
            Password
          </FormLabel>
          <Col sm={10}>
            <FormControl type="password" />
          </Col>
        </Row>

        <Row className="mb-3" controlId="textarea2">
          <FormLabel column sm={2}>
            Bio
          </FormLabel>
          <Col sm={10}>
            <FormControl as="textarea" style={{ height: "100px" }} />
          </Col>
        </Row>
      </div>

      {/* Responsive forms 2 */}
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms 2</h3>

        <Form>
          <fieldset>
            <Row className="mb-3" controlId="formHorizontalEmail">
              <FormLabel column sm={2}>
                Email
              </FormLabel>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </Row>

            <Row className="mb-3" controlId="formHorizontalPassword">
              <FormLabel column sm={2}>
                Password
              </FormLabel>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </Row>

            <Row className="mb-3">
              <FormLabel as="legend" column sm={2}>
                Radios
              </FormLabel>
              <Col sm={10}>
                <FormCheck
                  type="radio"
                  label="First radio"
                  name="formHorizontalRadios"
                  defaultChecked
                />
                <FormCheck
                  type="radio"
                  label="Second radio"
                  name="formHorizontalRadios"
                />
                <FormCheck
                  type="radio"
                  label="Third radio"
                  name="formHorizontalRadios"
                />
                <FormCheck
                  type="checkbox"
                  label="Remember me"
                  name="formHorizontalRadios"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Row>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}