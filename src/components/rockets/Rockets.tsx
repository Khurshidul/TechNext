import React, { useState } from "react";
import "./rockets.css";
import { useQuery } from "react-query";
import fetchData from "../../fetchFunction/fetch";
import { dataType } from "./data.interfafce";
import { useSearchContext } from "../context/appContext";
import Navigation from "../shared/Navigation";
import Moment from "react-moment";
interface PropTypes {}

const Rockets: React.FC<PropTypes> = () => {
  const { data } = useQuery("launches", () =>
    fetchData("https://api.spacexdata.com/v3/launches")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(9);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentitems = data.slice(firstItemIndex, lastItemIndex);
  let pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleDate = (date: string) => {
    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  return (
    <>
      <>
        <div className="cards">
          {currentitems.map((rocketData: dataType, i: string) => (
            <div className="cardsData" key={i}>
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
      </>

      <div className="pages">
        {pages.map((page, index) => {
          return (
            <button onClick={() => setCurrentPage(page)} key={index}>
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Rockets;
