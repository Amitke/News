import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const url =
  "https://newsapi.org/v2/everything?q=tesla&from=2023-06-04&sortBy=publishedAt&apiKey=8f17c9e7e4784a17bd96a40c6d6de418";

const News = () => {
  const [fetchData, setFetchData] = useState([]);
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFetchData(data.articles))
      .catch(() => console.log("Something Went wrong"));
  }, []);

  const handleBookMark = (e)=>{
    setBookMarks(link=>[...link,e])
  }
  
  return (
    <div className="news">
      {bookMarks.length !== 0 &&<h1>Bookmarks</h1>}
      <h3>{bookMarks}</h3>
      {fetchData.length === 0 ? (
        <Loader />
      ) : (
        <>
          {fetchData.map((value, index) => {
            return (
              <div className="row">
                <div className="image-section">
                  <a href={value.url} onClick={(e)=>handleBookMark(value.url)}>
                    <img src={value.urlToImage} alt={value.title} />
                  </a>
                </div>
                <div className="news--details-section">
                  <h2 onClick={(e)=>handleBookMark(value.url)}>
                    <a href={value.url}>{value.title}</a>
                  </h2>
                  <p>{value.content}</p>
                  <div className="author-date">
                    <h5>{value.author}</h5>
                    <h5>{value.publishedAt}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default News;
