import React, { useState, useRef } from 'react';
import './css.css';

export default function TestCategory() {
    const contentRef = useRef(null);
    const [isBackActive, setBackActive] = useState(true);
    const [isNextActive, setNextActive] = useState(true);

    const scrollFun = () => {
        if (contentRef.current && contentRef.current.scrollLeft <= 24) {
            setBackActive(true);
            console.log("true");
        } else {
            setBackActive(false);
            console.log("false");
        }

        let scrollMaxValue = contentRef.current.scrollWidth - contentRef.current.clientWidth - 24;
        if (contentRef.current.scrollLeft >= scrollMaxValue) {
            setNextActive(false);
        } else {
            setNextActive(true);
        }
    };

    const next = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft += 300;
        }
    };

    const back = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft -= 300;
        }
    };

    return (
        <div className="story-slider">
            <div onScroll={scrollFun} className="content" ref={contentRef}>
                <div className={`back-icon ${isBackActive ? 'active' : ''}`}>
                    <button onClick={back}>back</button>
                </div>
                <div className="stories">
                    <div className="stories">
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%90%D7%95%D7%9B%D7%9C-%D7%9C%D7%9B%D7%9C%D7%91%D7%99%D7%9D">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_01.png?v=1686564890" />
                                <div className="collection-name">אוכל לכלבים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%90%D7%95%D7%9B%D7%9C-%D7%9C%D7%97%D7%AA%D7%95%D7%9C%D7%99%D7%9D">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_02.png?v=1686564890" />
                                <div className="collection-name">אוכל לחתולים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%A6%D7%A2%D7%A6%D7%95%D7%A2%D7%99%D7%9D-%D7%9C%D7%9B%D7%9C%D7%91%D7%99%D7%9D?page=2">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_03.png?v=1686564890" />
                                <div className="collection-name">צעצועים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%98%D7%99%D7%A4%D7%95%D7%97-%D7%95%D7%99%D7%95%D7%A4%D7%99">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_08.png?v=1686564890" />
                                <div className="collection-name">טיפוח ויופי</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%AA%D7%92-%D7%A9%D7%9D-%D7%9C%D7%A4%D7%99-%D7%92%D7%96%D7%A2">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_06.png?v=1686564890" />
                                <div className="collection-name">תגי שם</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%A7%D7%A2%D7%A8%D7%95%D7%AA-%D7%9E%D7%99%D7%9D-%D7%95%D7%90%D7%95%D7%9B%D7%9C">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_04.png?v=1686564890" />
                                <div className="collection-name">כלי אוכל</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%97%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%9C%D7%9B%D7%9C%D7%91%D7%99%D7%9D">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_07.png?v=1686564890" />
                                <div className="collection-name">חטיפים לכלבים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D-%D7%95%D7%9E%D7%A6%D7%A2%D7%99%D7%9D">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_09.png?v=1686564890" />
                                <div className="collection-name">חול לחתולים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/collections/%D7%AA%D7%9B%D7%A9%D7%99%D7%A8%D7%99-%D7%94%D7%93%D7%91%D7%A8%D7%94">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_10.png?v=1686564890" />
                                <div className="collection-name">נגד פרעושים</div>
                            </a>
                        </div>
                        <div className="story">
                            <a href="https://peteat.co.il/pages/%D7%9E%D7%95%D7%A1%D7%99%D7%A7%D7%94-%D7%9C%D7%98%D7%99%D7%95%D7%9C%D7%99%D7%9D">
                                <img src="https://cdn.shopify.com/s/files/1/0619/8073/7768/files/Peteat_Story_05.png?v=1686564890" />
                                <div className="collection-name">מוזיקה</div>
                            </a>
                        </div>
                    </div>        </div>
                <div className={`next-icon ${isNextActive ? 'active' : ''}`}>
                    <button onClick={next}>next</button>
                </div>
            </div>
        </div>
    );
}
