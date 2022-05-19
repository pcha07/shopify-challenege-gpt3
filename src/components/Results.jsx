import Result from "./Result";
import { useRecoilState } from "recoil";
import { resultItems } from "../atoms/responseAtoms";
import { RiDeleteBack2Fill } from "react-icons/ri";

const Results = () => {
  // get all responses
  const [myResultItems, setMyResultItems] = useRecoilState(resultItems);

  // clear all user responses from local storage
  const clearData = () => {
    localStorage.clear("allEntries");
    localStorage.clear("entry");
    setMyResultItems([]);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center p-5  max-w-[1200px] mx-auto">
      <div className="flex items-start justify-center space-x-10 mt-5">
        <p
          className="
           text-[#5D3FD3] text-xl font-semibold transition ease-in-out hover:scale-105 border-b-2 border-black "
        >
          All Responses
          {myResultItems.length > 0 && (
            <span className="px-1.5 text-black bg-gray-300 ml-1 rounded-md">
              {myResultItems.length}
            </span>
          )}
        </p>
      </div>
      {myResultItems.length > 0 && (
        <div
          className="mt-3 p-3 shadow-md cursor-pointer rounded-md hover:scale-105 transition ease-in-out hover:bg-[#5D3FD3] hover:text-white flex items-center justify-center space-x-3"
          onClick={clearData}
        >
          <p className="font-semibold text-lg">Clear history</p>
          <RiDeleteBack2Fill size={19} />
        </div>
      )}
      {/* if the results array is greater than 0 then render list of items */}
      {myResultItems.length > 0 &&
        myResultItems
          .map((result) => (
            <Result
              id={result.id}
              key={result.created}
              prompt={result.prompt}
              response={result.choices[0].text}
            />
          ))
          .reverse()}
    </section>
  );
};

export default Results;
