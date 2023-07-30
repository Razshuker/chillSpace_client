import { useEffect } from "react";

function Scroll() {
  useEffect(() => {

    const progress = document.querySelector("#progress");
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      const percentage = (scrollPosition / totalHeight) * 100;
      progress.style.width = percentage + "%";
    });
  }, []);

  return (
    <div id="progress-bar">
      <div id="progress"></div>
    </div>
  );
}

export default Scroll;