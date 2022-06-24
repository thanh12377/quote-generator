import React from "react";
import { Container } from '@mui/material';
import "./Quotes.scss";


import { useState } from "react";

const Quotes = (props) =>{
     
 return(
    <Container maxWidth="md">
        <div className="quote">
            <blockquote>
            {props.quoteText}
            </blockquote>        
        </div>
        {props.children}
    </Container>
 )
};

export default Quotes;