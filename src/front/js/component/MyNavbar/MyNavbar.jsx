import React, {useRef} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import useStore from "../../store/AppContext.jsx";

import "./MyNavbar.css";
import MyUserLoginDropdown from "../MyUserLoginDropdown/MyUserLoginDropdown.jsx";
import MyLanguageDropdown from "../MyLanguageDropdown/MyLanguageDropdown.jsx";

const MyNavbar = () => {
  const { store, action } = useStore();
  const { handleShow, handleLogout } = action;
  const { logo, isUserLogged, userInfo } = store;

  const navbarCollapseRef = useRef(null);

  const handleLinkClick = () => {
      navbarCollapseRef.current.classList.remove('show');
    };

  const handleLogoutClick  = () => {
    handleLinkClick();
    handleLogout();
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container fluid="md">
          <Navbar.Brand className="logo">
            <Link to="/" className="branding">
              <img src={logo} width={100} />
            </Link>
            <Link to="/" className="branding">
              bike4u
            </Link>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

         
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end navbar-box gradient rise" ref={navbarCollapseRef}>
            <Nav className="bg-black">
              <Link to="/Profile" onClick={handleLinkClick}>
                <Nav.Item className="btn button user-name">
                  {isUserLogged
                ? userInfo?.name.toUpperCase()
                : null}
                </Nav.Item>
              </Link>
              <Link to="/customizebike" onClick={handleLinkClick}>
                <Nav.Item className="btn button">
                  <FormattedMessage id="myNavbarButtomCustomizeBike"></FormattedMessage>
                </Nav.Item>
              </Link>
              <Link to="/favorites" onClick={handleLinkClick}>
                <Nav.Item className="btn button">
                  <FormattedMessage id="myNavbarButtomFavourites"></FormattedMessage>
                </Nav.Item>
              </Link>
              <Link to="/aboutus" onClick={handleLinkClick}>
                <Nav.Item className="btn button">
                  <FormattedMessage id="myNavbarButtomContact"></FormattedMessage>
                </Nav.Item>
              </Link>

              {isUserLogged
              ? <Link to="/" onClick={handleLogoutClick}>
                  <Nav.Item className="btn button">
                    <FormattedMessage id="myNavbarButtomLogout"></FormattedMessage>
                  </Nav.Item>
                </Link> 
              : <MyUserLoginDropdown closeNavbar={handleLinkClick} onClick={handleLinkClick}/>}
              <MyLanguageDropdown onClick={handleLinkClick} />

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;