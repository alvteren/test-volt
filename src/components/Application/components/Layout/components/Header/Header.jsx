import './Header.css';

import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Link from '@UI/Link';

const LINKS = [{ name: 'Customers', path: 'customers', selected: ['customers'] }];

const Header = () => {
  return (
    <Navbar className="header" expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand as={props => <Link routeName="home" {...props} />}>Invoice App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {LINKS.map(link => (
            <Nav key={link.path} className="mr-auto">
              <Nav.Link as={props => <Link routeName={link.path} {...props} />}>
                {link.name}
              </Nav.Link>
            </Nav>
          ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
