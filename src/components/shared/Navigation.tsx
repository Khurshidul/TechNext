import React, { useState } from "react";
import "./Navigation.css";
import { Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetchData from "../../fetchFunction/fetch";
import { dataType } from "../rockets/data.interfafce";
import Rockets from "../rockets/Rockets";
interface PropTypes {
  // searchQuery: string;
  // setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<PropTypes> = () => {
  const { data } = useQuery("launches", () =>
    fetchData("https://api.spacexdata.com/v3/launches")
  );

  // **********Search By Misssion Name ****************

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<dataType[]>([]);
  const { searchHandler } = useSearchContext();
  const handleSearch = (e: React.FormEvent) => {
    searchHandler(searchQuery);
    setSearchQuery("");
  };
  // -------------------------------------

  // **********Filter By Week ****************
  const lastWeek = () => {
    const currentDate = Date.parse("2020-12-07");
    console.log(currentDate);
    const filteredObjects = data.filter((object: dataType) => {
      const week = 604800000;
      const objectDate = object.launch_date_local;

      return currentDate - Date.parse(objectDate) <= week;
    });
    console.log(filteredObjects);
    setFilteredData(filteredObjects);
  };
  // -----------------------------------

  // **********Filter By Month ****************
  const lastMonth = () => {
    const currentDate = Date.parse("2020-12-07");
    console.log(currentDate);
    const filteredObjects = data.filter((object: dataType) => {
      const month = 2592000000;
      const objectDate = object.launch_date_local;

      return currentDate - Date.parse(objectDate) <= month;
    });
    console.log(filteredObjects);
    setFilteredData(filteredObjects);
  };
  // ------------------------------------------------

  // **********Filter By Year ****************
  const lastYear = () => {
    const currentDate = Date.parse("2020-12-07");
    const filteredObjects = data.filter((object: dataType) => {
      const year = 31536000000;
      const objectDate = object.launch_date_local;

      return currentDate - Date.parse(objectDate) <= year;
    });
    console.log(filteredObjects);
    setFilteredData(filteredObjects);
  };
  // -------------------------------------------------------

  // ********************Called All the filter Function of Date***************
  const handleChange = (e: React.FormEvent) => {
    // Get the value of the selected option.
    const selectedValue = (e.target as HTMLInputElement).value;

    if (selectedValue === "lastWeek") {
      // called the week function
      lastWeek();
    }
    if (selectedValue === "lastMonth") {
      // called the month function
      lastMonth();
    }
    if (selectedValue === "lastYear") {
      // called the month function
      lastYear();
    }
  };
  // ***********************Date Formator Function **********************
  const handleDate = (date: string) => {
    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  // ************************* Filter By Launch Status ************************

  const launchStatusSuccess = () => {
    if (data.length) {
      const filterByLaunch = data.filter((filterData: dataType) => {
        if (filterData.launch_success === true) {
          return filterData;
        }
      });
      setFilteredData(filterByLaunch);
    }
  };
  const launchStatusFailed = () => {
    if (data.length) {
      const filterByLaunch = data.filter((filterData: dataType) => {
        if (filterData.launch_success === false) {
          return filterData;
        }
      });
      setFilteredData(filterByLaunch);
    }
  };

  const handleChangeLaunchStatus = (e: React.FormEvent) => {
    const selectedValue = (e.target as HTMLInputElement).value;
    if (selectedValue === "success") {
      // called the Launch Status function
      launchStatusSuccess();
    }
    if (selectedValue === "failed") {
      // called the Launch Status function
      launchStatusFailed();
    }
  };

  // ************************* Filter By Launch Status ************************
  const handleUpcoming = () => {
    if (data.length) {
      const filterUpcoming = data.filter((filterData: dataType) => {
        if (filterData.upcoming === true) {
          return filterData;
        } else {
          return null;
        }
      });
      setFilteredData(filterUpcoming);
      console.log(filterUpcoming);
    }
  };

  return (
    <Container fluid>
      <Nav className="brandName">
        <h2>
          Spaceflight Details
          <br />
        </h2>
        <small>
          Find out the elaborate features of all the past big spaceflights.
        </small>
      </Nav>

      <div className="show">
        <form>
          <input
            onChange={handleUpcoming}
            type="checkbox"
            name="showUpComing"
            id="showUpComing"
          />
          <label htmlFor="showUpComing">
            <small>Show Upcoming Only</small>
          </label>
        </form>
      </div>
      <div className="search-filter">
        <div>
          <form>
            <input
              className="searchByName"
              type="text"
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              id="searchByName"
              placeholder="search by name..."
            />
            <Link to={"/search-result"} onClick={handleSearch}>
              <FontAwesomeIcon id="searchIcon" icon={faMagnifyingGlass} />
            </Link>
          </form>
        </div>
        <div className="filter-section">
          <div>
            <select
              onChange={handleChangeLaunchStatus}
              name="rocket"
              id="rocket"
            >
              <option defaultValue="launch-status" id="rocket">
                By Launch Status
              </option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <select
              onChange={handleChange}
              name="launch-Schedule"
              id="launch-Schedule"
            >
              <option placeholder="By Launch Date" defaultValue="launchByWeek">
                Launch By Date
              </option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>
          </div>
        </div>
      </div>
      <>
        {filteredData.length > 0 ? (
          <div className="cards">
            {filteredData.map((rocketData: dataType) => (
              <div className="cardsData" key={rocketData.mission_name}>
                <img src={rocketData.links.mission_patch_small} alt="" />
                <div className="data">
                  <p>Launch Date: {handleDate(rocketData.launch_date_local)}</p>
                  <h4>{rocketData.mission_name}</h4>
                  <small>{rocketData.rocket.rocket_id}</small>
                  <br />
                  <p>
                    Launch Status:
                    <br />
                    <br />
                    {rocketData.launch_success === true ? (
                      <span className="success">Success</span>
                    ) : (
                      <span className="failed">Failed</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Rockets />
          </div>
        )}
      </>
    </Container>
  );
};

export default Navigation;
