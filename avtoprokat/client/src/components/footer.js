import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-4">
      <Container>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/some-path">
              Некоторый путь
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/another-path">
              Другой путь
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="text-center py-3">
          Авторские права © {new Date().getFullYear()} Автопрокат №1
        </div>
      </Container>
    </footer>
  );
};