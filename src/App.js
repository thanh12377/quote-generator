import React, { Fragment, useEffect, useCallback } from "react";
import { useState } from "react";
import "./App.scss";
import { TiArrowSync } from "react-icons/ti";
import Quotes from "./components/Quotes";
import QuotesList from "./components/QuotesList";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Container } from "@mui/material";

function App() {
  const [quotes, setQuotes] = useState({});
  const [hover, setHover] = useState("");
  const [quoteList, setQuoteList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowQuote, setIsShowQuote] = useState(false);
  const handleMouseOver = () => {
    setHover("hover");
  };
  const handleMouseLeave = () => {
    setHover("");
  };

  const fetchQuoteHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setQuotes(data.data[0]);
      // console.log(response);
    } catch (error) {
      console.log(error.message);
    }

    setQuoteList([]);
    setIsLoading(false);
  };

  const handleQuoteList = async () => {
    setIsLoading(true);
    // console.log(quotes);
    try {
      const response = await fetch(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${
          quotes.quoteAuthor
        }&page=${currentPage}&limit=${10}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setQuoteList(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // console.log("in effect");
    fetchQuoteHandler();
  }, []);
  useEffect(() => {
    if (isShowQuote) {
      handleQuoteList();
      // console.log("in effect 2");
    }
  }, [currentPage]);
  // console.log(currentPage);
  return (
    <Fragment>
      <div className="random">
        <span className="random-text">random</span>
        <TiArrowSync
          className="icon"
          onClick={() => {
            fetchQuoteHandler();
            setIsShowQuote(false);
            setCurrentPage(1);
          }}
        />
      </div>
      <React.StrictMode>
        {isLoading && <p>Loading...</p>}
        {quoteList.length === 0 && !isLoading && (
          <>
            <Quotes quoteText={quotes.quoteText}>
              <div
                className={`quote-note ${hover}`}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleQuoteList();
                  setIsShowQuote(true);
                }}
              >
                <h3 className={`quotes-author quotes-author-${hover}`}>
                  {quotes.quoteAuthor}
                </h3>
                <span className={`quotes-genre quotes-genre-${hover}`}>
                  {quotes.quoteGenre}
                </span>
                <HiOutlineArrowNarrowRight
                  className={`icon icon-${hover}`}
                ></HiOutlineArrowNarrowRight>
              </div>
            </Quotes>
          </>
        )}
        {quoteList.length !== 0 && !isLoading && (
          <>
            <span className="authorName">{quotes.quoteAuthor}</span>
            <QuotesList quoteList={quoteList}></QuotesList>
            <Container maxWidth="md">
              <div className="pagination">
                <button
                  className={`${currentPage === 1 ? "disable" : ""}`}
                  onClick={() => setCurrentPage(pagination.currentPage - 1)}
                  disabled={currentPage === 1 ? true : false}
                >
                  {`<`}
                </button>
                <div>{`${currentPage} of ${pagination.totalPages}`}</div>
                <button
                  className={`${pagination.nextPage ? "" : "disable"}`}
                  onClick={() => setCurrentPage(pagination.currentPage + 1)}
                  disabled={pagination.nextPage ? false : true}
                >
                  {`>`}
                </button>
              </div>
            </Container>
          </>
        )}
      </React.StrictMode>
    </Fragment>
  );
}

export default App;
