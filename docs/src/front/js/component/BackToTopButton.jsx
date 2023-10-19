import React from "react";
import { useState, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";

const BackToTopButton = () => {

    const [backToTopButton, setBackToTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const ScrollUp = () => {
        window.scrollTo(
            {
                top: 500,
                behavior: "smooth"
            }
        )
    }
    return (
        <div className={"backToTopButton " + backToTopButton ?"":"d-none"}>
            {backToTopButton && (
                <button className="backToTopButton"
                onClick={ScrollUp}
                ><FormattedMessage id="goToTop"></FormattedMessage>
                </button>
            )}

        </div>

    );
};

export default BackToTopButton;