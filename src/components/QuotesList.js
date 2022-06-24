import React from "react";
import Quotes from "./Quotes";
import "./QuotesList.scss";
import { useState } from "react";


const QuotesList = (props) => {
  
  return (
    <ul>
      {props.quoteList.map((quote) => (
        <Quotes
          key={quote._id}
          quoteText={quote.quoteText}
          quoteAuthor={quote.quoteAuthor}
          quoteGenre={quote.quoteGenre}
        ></Quotes>
      ))}
      
    </ul>
  );
};

export default QuotesList;
