import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full flex items-center bg-[#5D3FD3] px-4 py-1 justify-between">
      <div className="p-2.5 transition ease-in-out hover:scale-105 cursor-pointer animate-pulse text-white">
        <a href="/">
          <FaRobot size={45} />
        </a>
      </div>
      <div className="p-2.5 mt-2">
        <p className="text-xl font-semibold text-white">GPT-3</p>
      </div>
    </header>
  );
};

export default Navbar;
