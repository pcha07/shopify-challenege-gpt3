import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { resultItems } from "../atoms/responseAtoms";

const Modal = () => {
  // array to hold results
  const [viewResultItems, setViewResultItems] = useRecoilState(resultItems);
  // if there is an error, set error message
  const [errorMsg, setErrorMsg] = useState("");

  // preset data, prompt is updated by the user
  const [data, setData] = useState({
    prompt: "",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  // when request is made disable button to handle the first request
  const [disableBtn, setDisableBtn] = useState(false);

  // handle submition of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
            mode: "no-cors",
          },
          body: JSON.stringify(data),
        }
      ).then((res) => {
        if (res.status === 401) {
          setErrorMsg("server error");
          setDisableBtn(false);
          return;
        } else {
          return res.json();
        }
      });

      response.prompt = data.prompt || "Auto Generated Prompt";

      // save item into local storage
      let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      if (existingEntries === null) {
        existingEntries = [];
      }
      localStorage.setItem("entry", JSON.stringify(response));
      existingEntries.push(response);
      localStorage.setItem("allEntries", JSON.stringify(existingEntries));
      setViewResultItems(existingEntries);
      setDisableBtn(false);
      data.prompt = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg(false);
      }, 3000);
    }
  }, [errorMsg]);

  return (
    <section className="w-full flex flex-col items-center justify-center p-3 shadow-xl mt-5 rounded-lg ">
      <h4 className="font-semibold text-2xl sm:text-4xl">
        Have fun with Open AI
      </h4>
      <div className="w-full mt-2.5">
        <form
          className="w-full flex flex-col items-center justify-center"
        >
          <label className="p-1 mb-2 font-semibold text-lg ">
            Write a prompt
          </label>
          <textarea
            required
            className="w-[60%] p-2.5 outline-none bg-gray-200 shadow-md placeholder:text-black/70"
            onChange={(e) => setData({ ...data, prompt: e.target.value })}
            placeholder="ex. Write a poem about a dog wearing skis"
            value={data.prompt}
            maxLength={150}
          />
          {errorMsg && (
            <p className="text-red-500 mt-2 font-bold text-[18px]">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className={`${
              disableBtn
                ? "w-[60%] my-5 p-2 bg-gray-400 text-black font-semibold transition ease-in-out hover:scale-105 hover:font-bold text-lg"
                : "w-[60%] my-5 p-2 bg-[#5D3FD3] text-white font-semibold transition ease-in-out hover:scale-105 hover:font-bold text-lg"
            }`}
            onClick={handleSubmit}
            disabled={disableBtn}
          >
            Generate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Modal;
