import React, { useEffect, useState } from "react";
import "./rockets.css";
import { Container } from "react-bootstrap";
import { dataType } from "./data.interfafce";
import { useSearchContext } from "../context/appContext";
import { axiosData } from "../../fetchFunction/fetch";

interface PropTypes {}

const SearchResults: React.FC<PropTypes> = () => {
  const [rocketData, setRocketData] = useState<dataType[]>([]);
  const { query } = useSearchContext();
  useEffect(() => {
    try {
      const fetchQuote = async () => {
        const res = await axiosData("https://api.spacexdata.com/v3/launches");
        setRocketData(res.data);
      };
      fetchQuote();
    } catch (e: any) {
      console.log(e);
    }
  }, []);
  let filterSearchRockets: dataType[] = [];
  if (rocketData?.length && query) {
    filterSearchRockets = rocketData.filter((resultRocket: dataType) => {
      if (
        resultRocket.mission_name.toLowerCase().includes(query.toLowerCase())
      ) {
        return resultRocket;
      }
      return null;
    });
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
    <Container>
      <div className="search-Result">
        <h1>Search Results</h1>
      </div>
      <div className="cards">
        {filterSearchRockets.length > 0 ? (
          <>
            {filterSearchRockets.map((rocketData: dataType) => (
              <div className="cardsData" key={rocketData.flight_number}>
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
          </>
        ) : (
          <div>
            <h1>No results found.</h1>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchResults;
