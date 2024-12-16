import bg from "/bg.jpg";
import dp from "/dp.jpg";
import dot from "../../assets/icons/more.png";
import vc from "../../assets/icons/video.png";
import edit from "../../assets/icons/edit.png";
import mag from "../../assets/icons/search.png";
import plus from "../../assets/icons/plus.png";
import minus from "../../assets/icons/minus.png";
import { useState } from "react";

const MainScreen = () => {
  const [addMode, setAddMode] = useState(false);

  const addUser = () => {
    setAddMode(!addMode); // Toggle addMode between true and false
  };

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card with Glassmorphism effect */}
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 backdrop-blur-4xl backdrop-saturate-[220%] h-[85vh] w-[90%] bg-[rgba(53,60,88,0.67)] border border-white/10 rounded-xl shadow-inner drop-shadow-2xl shadow-white">
          {/* Flex container for the 3 sections */}
          <div className="flex w-full">
            {/* Users Section */}
            <div className="users w-[80%]">
              <div className="top flex items-center justify-between">
                <div className="left flex items-center gap-3">
                  <img
                    src={dp}
                    className="w-[48px] rounded-3xl shadow-sm shadow-white"
                    alt=""
                  />
                  <h1 className="text-white text-2xl font-semibold">Howdy, Harnoor</h1>
                </div>
                <div className="right gap-5 flex">
                  <img src={dot} alt="" className="cursor-pointer w-[24px]" />
                  <img src={vc} alt="" className="cursor-pointer w-[24px]" />
                  <img src={edit} alt="" className="cursor-pointer w-[24px]" />
                </div>
              </div>
              <div className="SEARCHBAR mt-4 flex">
                <img
                  src={mag}
                  className="bg-[rgba(53,60,88,0.67)] p-1 w-[35px] cursor-pointer"
                  alt=""
                />
                <input
                  className="w-[60%] bg-[rgba(53,60,88,0.67)] p-1"
                  type="search"
                  placeholder="Search"
                />
                <img
                  src={addMode ? minus : plus} // Toggle between 'minus' and 'plus' icon
                  className="ml-16 bg-[rgba(53,60,88,0.67)] cursor-pointer p-1 rounded-lg w-[35px]"
                  onClick={addUser}
                  alt="addUser"
                />
              </div>
            </div>

            {/* Chats Section */}
            <div className="chats w-[140%]">
              <div>Chat</div>
            </div>

            {/* Profile Section */}
            <div className="profile w-[80%]">
              <div>Profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
