import { BsFillTrashFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { resultItems } from "../atoms/responseAtoms";

const Result = ({ prompt, response, id }) => {
  // retrieve all results
  const [viewResultItems, setViewResultItems] = useRecoilState(resultItems);

  // Delete a single item from list and local storage
  const handleDelete = (id) => {
    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    let newArray = existingEntries.filter((item) => item.id !== id);
    localStorage.setItem("allEntries", JSON.stringify(newArray));
    setViewResultItems(newArray);
  };

  return (
    <div className="rounded-md shadow-xl mt-5 flex flex-col justify-center w-full transition ease-in-out space-y-4 hover:scale-105 mx-auto flex-grow py-2">
      <div className="py-2 flex items-center flex-col rounded-md justify-center bg-yellow-300">
        <h4 className="text-[#5D3FD3] font-semibold text-lg">Prompt -</h4>
        <p className=" px-6 font-semibold text-center">{prompt}</p>
      </div>
      <div className=" flex items-center flex-col rounded-md justify-center space-y-2">
        <h4 className="text-[#5D3FD3] font-medium text-lg">Response -</h4>
        <p className="font-semibold text-center md:text-justify px-6">{response}</p>
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
