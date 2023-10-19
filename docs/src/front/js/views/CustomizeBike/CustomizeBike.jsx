import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Nav from "react-bootstrap/Nav";

import useStore from "../../store/AppContext.jsx";
import fetchGetBikes from "../../utils/fetchGetBikes.js";
import fetchGetPartByTypeTerrainAndSize from "../../utils/fetchGetPartByTypeTerrainAndSize.js";
import YourBike from "../../component/YourBike/YourBike.jsx";
import BikesCards from "../../component/BikesCards/BikesCards.jsx";
import PartsCards from "../../component/PartsCards/partsCards.jsx";
import "./CustomizeBike.css";
import BackToTopButton from "../../component/BackToTopButton.jsx";
import fetchGetAllBikesSpecificTerrain from "../../utils/fetchGetAllBikesSpecificTerrain.js";
import { Tabs, Tab } from "react-bootstrap";

const CustomizeBike = () => {
  const { store } = useStore();
  const [bikeMtb, setBikeMtb] = useState({});
  const [bikeUrban, setBikeUrban] = useState({});
  const [bikeRoad, setBikeRoad] = useState({});
  const [parts, setParts] = useState({});
  const { userInfo } = store;
  const [listOfPart, setListOfPart] = useState([]);
  const [userBike, setUserBike] = useState([]);

  const getElements = async () => {
    fetchGetBikes("mtb", setBikeMtb);
    fetchGetBikes("urban", setBikeUrban);
    fetchGetBikes("road", setBikeRoad);
    fetchGetPartByTypeTerrainAndSize("road", "s").then((res) => setParts(res));
  };

  useEffect(() => {
    getElements();
  }, []);

  const info = async () => {
    const arrayOfBikes = await fetchGetAllBikesSpecificTerrain(
      userInfo.bike_type,
      setUserBike
    );
    setUserBike(arrayOfBikes);

    const arrayOfParts = await fetchGetPartByTypeTerrainAndSize(
      userInfo.bike_type,
      userInfo.size
    );
    setListOfPart(arrayOfParts);
  };
  useEffect(() => {
    if (userInfo && userInfo.bike_type && userInfo.size) {
      info();
    }
  }, [userInfo]);

  const myRandom = () => {
    return Math.floor(Math.random() * 10000);
  };
  return (
    <>
      <YourBike key={myRandom()} list={listOfPart} bikes={userBike} />
      <Tabs defaultActiveKey={userInfo?.bike_type} id="uncontrolled-tab-example" className="m-3 justify-content-center titleTabs">
        <Tab eventKey="mtb" title="MTB">
      <div className="row">
        <div className="col">
          {/* <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-smooth-scroll="true"
            className="scrollspy-example"
            tabIndex="0"
          > */}
            {/* <h4 id="list-item-1">
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-1"
              >
                <h1 className="BikeTerrainMainTitle"><FormattedMessage id="customMTB" defaultMessage="MTB Bikes"/></h1>
              </a> */}
              <div className="wrapperBikesCards">
                {bikeMtb.length
                  ? bikeMtb.map((element, index) => {
                    if (index < 8) {
                      return (
                        <BikesCards
                          key={element.id + '-' + element.title + index}
                          id={element.id}
                          image={element.image}
                          title={element.title}
                          description={element.description}
                          link={element.link}
                        />
                      );}
                    })
                  : null}
              </div>
              {/* </h4> */}
              </div>
              </div>
              {/* </div> */}
              </Tab>
              <Tab eventKey="road" title="Road">
            {/* <h4 id="list-item-2">
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-2"
              >
                <h1 className="BikeTerrainMainTitle"><FormattedMessage id="customRoad" defaultMessage="Road Bikes"/></h1>
              </a> */}
              <div className="wrapperBikesCards">
                {bikeRoad.length
                  ? bikeRoad.map((element, index) => {
                    if (index < 8) {
                      
                    return (
                          <BikesCards
                            key={element.id + '-' + element.title + index}
                            id={element.id}
                            image={element.image}
                            title={element.title}
                            description={element.description}
                            link={element.link}
                          />
                          );}
                        })
                        : null}
              </div>
            {/* </h4> */}
            </Tab>
            <Tab eventKey="urban" title="Urban">
            {/* <h4 id="list-item-3">
              <a
                className="list-group-item list-group-item-action"
                href="#list-item-2"
              >
                <h1 className="BikeTerrainMainTitle"><FormattedMessage id="customUrban" defaultMessage="Urban Bikes"/></h1>
              </a> */}
              <div className="wrapperBikesCards">
                {bikeUrban.length
                  ? bikeUrban.map((element, index) => {
                    if (index < 8) {
                      return (
                        <BikesCards
                          key={element.id + '-' + element.title + index}
                          id={element.id}
                          image={element.image}
                          title={element.title}
                          description={element.description}
                          link={element.link}
                        />
                      );}
                    })
                  : null}
              </div>
            {/* </h4> */}
            </Tab>
            </Tabs>
            {/* <div className="titleCards mt-5 text-center">
              <FormattedMessage id="myPartsFavouriteView"></FormattedMessage>
            </div> */}
            {/* <Tabs id="uncontrolled-tab-example">
            <Tab eventKey="part" title="Parts">
            <div className="wrapperBikesCards">
              {parts.length
                ? parts.map((element, index) => {
                    return (
                      <PartsCards
                      key={element.id + '-' + element.title + index}
                        id={element.id}
                        image={element.image}
                        title={element.title}
                        description={element.description}
                        link={element.link}
                      />
                    );
                  })
                : null}
            </div>
            </Tab>
          </Tabs> */}
          {/* </div> */}
        {/* </div> */}
      {/* // </div> */}
      {/* // </Tab> */}
      {/* <div className="d-flex justify-content-center">
      <div className="titleCards mt-5 text-center p-3">
        <FormattedMessage id="myBikesFavouriteView"/>
      </div>
        </div> */}
    </>
  );
};

export default CustomizeBike;
