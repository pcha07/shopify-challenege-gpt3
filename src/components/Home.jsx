import Modal from "./Modal";
import Results from "./Results";
import { useEffect, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { resultItems } from "../atoms/responseAtoms";

const Home = () => {
  // handle state when back to top button is clicked
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  // get all result items
  const [viewResultItems, setViewResultItems] = useRecoilState(resultItems);

  // when user scrolls down enough show the back to top button
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setBackToTopBtn(true);
      } else {
        setBackToTopBtn(false);
      }
    });
  }, [backToTopBtn]);

  // when user clicks the back to top button handle the scroll back to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className={`${viewResultItems.length === 0 ? "w-full space-y-1 p-2.5 absolute top-24 overflow-x-hidden overflow-y-hidden" : "w-full space-y-1 p-2.5 absolute top-24 overflow-x-hidden"} `}>
      {/* Modal to enter search parameters */}
      {backToTopBtn && (
        <button onClick={scrollToTop} className="rounded-full text-[#5D3FD3]">
          <BsArrowUpCircleFill
            size={40}
            className="cursor-pointer mr-2 mt-3 fixed bottom-7 right-4 z-50 bg-white rounded-full"
          />
        </button>
      )}
      <Modal />
      {/* container to show search results */}
      <Results />
    </section>
  );
};

export default Home;
