import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quote.css'

function Quote() {
    const [quoteNumber, setQuoteNumber] = useState(1);
    const [quote, setQuote] = useState('Please Wait');

    useEffect(() => {
        const fetchQuoteDelay = () => {
                fetchQuote();
        };
        fetchQuoteDelay();
        const interval = setInterval(() => {
            setQuoteNumber(prevNumber => prevNumber + 1);
            fetchQuoteDelay();
        }, 120000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    function fetchQuote() {
        let url = `https://api.adviceslip.com/advice`;
        axios.get(url)
            .then((res) => {
                setQuote(res.data.slip.advice);
                if (advice && advice.split(' ').length <= 8) {
                    setQuote(advice);
                } else {
                    fetchQuote();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='quotecomponent'>
            <div className='q'>Quote #{quoteNumber}</div>
            <div className='quote'>"{quote}"</div>
            <div className='ecllipse'></div>
        </div>
    );
}

export default Quote;
