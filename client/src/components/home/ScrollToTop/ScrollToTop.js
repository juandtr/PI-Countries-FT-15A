import React, { useEffect, useState } from "react";
import BackToTop from "../../../img/BackToTop.png";


export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <ScrollTop>
      {isVisible && (
        <div onClick={scrollToTop}>
          <img src={BackToTop} height="50" width="50" />
        </div>
      )}
    </ScrollTop>
  );
}
