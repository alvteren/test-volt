import './Header.css';

import React from 'react';
import { withRoute } from 'react-router5';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Link from '@UI/Link';
import PropTypes from 'prop-types';

const LINKS = [
  { name: 'Customers', path: 'customers', selected: ['customers'] },
  { name: 'Products', path: 'products', selected: ['products'] },
  {
    name: 'Invoices',
    path: 'invoices',
    selected: ['invoices', 'invoices.new', 'invoices.edit', 'invoices.show']
  }
];

const Header = props => {
  const { route } = props;
  console.log('route', route);
  return (
    <Navbar className="header" expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand as={props => <Link routeName="home" {...props} />}>Invoice App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {LINKS.map(link => (
              <Nav.Link
                key={link.path}
                as={props => <Link routeName={link.path} {...props} />}
                active={link.selected.includes(route.name)}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  route: PropTypes.object.isRequired
};

export default withRoute(Header);
