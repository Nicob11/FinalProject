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
import swal from "sweetalert2";

const MyNavbar = () => {
  const { store, action } = useStore();
  const { handleShow, handleLogout, setIsInvited} = action;
  const { logo, isUserLogged, userInfo } = store;

  const navbarTogglerRef = useRef(null);

  const handleLinkClick = () => {

      navbarTogglerRef.current.click();

    };

  const handleGoFav = () => {
    if (isUserLogged) {
      setIsInvited(false)
      handleLinkClick();
      // handleShow();
    }
    else {
      // handleShowAlert();
      swal.fire({
        confirmButtonColor: '#ffd102',
        icon: 'error',
        title: 'Bike4U',
        text: '"You must be logged in to see your favorites"',
        
      })
    }
  }

  const handleLogoutClick  = () => {
    setIsInvited(true)
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
            <Link to="/" className="branding"  onClick={handleLinkClick}>
              <img src={logo} width={100} />
            </Link>
            <Link to="/" className="branding myshow d-sm-inline"  onClick={handleLinkClick}>
              bike4u
            </Link>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={navbarTogglerRef}/>

         
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end navbar-box gradient rise">
            <Nav className="bg-black">
              {isUserLogged
                ? <Link to="/Profile" onClick={handleLinkClick}>
                    <Nav.Item className="btn button user-name">
                      {userInfo?.name?.toUpperCase()}
                    </Nav.Item>
                  </Link>          
                : null}
                { isUserLogged ? 
              <Link to={"/customizebike"} onClick={handleLinkClick}>
                <Nav.Item className="btn button">
                  <FormattedMessage id="myNavbarButtomCustomizeBike"></FormattedMessage>
                </Nav.Item>
              </Link>
              : null }
              {isUserLogged
              ?
                <Link to={isUserLogged ? "/favorites" : "/"} onClick={handleGoFav}>
                  <Nav.Item className="btn button">
                    <FormattedMessage id="myNavbarButtomFavourites"></FormattedMessage>
                  </Nav.Item>
                </Link>
              : null}  
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