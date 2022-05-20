import { BsFillTrashFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { resultItems } from "../atoms/responseAtoms";
import { BsFillStarFill } from 'react-icons/bs'

const Result = ({ prompt, response, id, index }) => {
  // retrieve all results
  const [viewResultItems, setViewResultItems] = useRecoilState(resultItems);
  const newest = index === viewResultItems.length - 1 ? true : false;
  console.log(newest);

  // Delete a single item from list and local storage
  const handleDelete = (id) => {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    let newArray = existingEntries.filter((item) => item.id !== id);
    localStorage.setItem("allEntries", JSON.stringify(newArray));
    setViewResultItems(newArray);
  };

  return (
    <div className="rounded-md shadow-lg mt-5 flex flex-col justify-center w-full transition ease-in-out  hover:scale-105 mx-auto flex-grow py-2 group ">
      {newest && (
        <p className="text-[#5D3FD3] p-2 font-semibold text-lg animate-bounce flex items-center ">Most Recent
        <BsFillStarFill className="ml-2"/>
        </p>
      )}
      <div className="py-2 flex items-center flex-col rounded-md justify-center bg-black group-hover:bg-cyan-500">
        <h4 className="text-white font-semibold text-lg">Prompt -</h4>
        <p className="text-white px-6 font-semibold text-center">{prompt}</p>
      </div>
      <div className=" flex items-center flex-col rounded-md justify-center space-y-2 mt-3">
        <h4 className="text-[#5D3FD3] font-medium text-lg">Response -</h4>
        <p className="font-semibold text-center md:text-justify px-6">
          {response}
        </p>
      </div>
      <div className="flex items-center justify-center p-2">
        <BsFillTrashFill
          size={25}
          className="cursor-pointer mr-2 mt-3"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default Result;
