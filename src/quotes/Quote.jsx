import React, { useState, useEffect } from "react";
import axios from "axios";
import "./quote.css";

function Quote() {
  const [quoteNumber, setQuoteNumber] = useState();
  const [quote, setQuote] = useState("Please Wait");

  useEffect(() => {
    const fetchQuoteDelay = () => {
      fetchQuote();
    };
    fetchQuoteDelay();
    const interval = setInterval(() => {
      fetchQuoteDelay();
    }, 120000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function fetchQuote() {
    let url = `https://api.adviceslip.com/advice`;
    axios
      .get(url)
      .then((res) => {
        setQuoteNumber(res.data.slip.id);
        if (
          res.data.slip.advice &&
          res.data.slip.advice.split(" ").length <= 9
        ) {
          setQuote(res.data.slip.advice);
        } else {
          fetchQuote();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="quotecomponent">
      <div className="q">Quote #{quoteNumber}</div>
      <div className="quote">"{quote}"</div>
      <div className="ecllipse"></div>
    </div>
  );
}

export default Quote;
