import bg from "/bg.jpg";
import dp from "/dp.jpg";
import dp2 from "/dp2.png";
import dot from "../../assets/icons/more.png";
import vc from "../../assets/icons/video.png";
import edit from "../../assets/icons/edit.png";
import mag from "../../assets/icons/search.png";
import plus from "../../assets/icons/plus.png";
import minus from "../../assets/icons/minus.png";
import phone from "../../assets/icons/phone.png";
import info from "../../assets/icons/info.png";
import img from "../../assets/icons/img.png";
import camera from "../../assets/icons/camera.png";
import mic from "../../assets/icons/mic.png";
import emoji from "../../assets/icons/emoji.png";
import ad from "../../assets/icons/arrowDown.png";
import au from "../../assets/icons/arrowUp.png";
import dwnld from "../../assets/icons/download.png";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/userSlice";
import { auth } from "../../firebase/config";

const MainScreen = () => {

  const fetchedUser = useSelector((state)=>(state?.user?.userData))
  console.log(fetchedUser, "usererererer")
  const dispatch = useDispatch()

  const [addMode, setAddMode] = useState(false);
  const [OpenEmoji, setOpenEmoji] = useState(false);
  const [Text, setText] = useState("");

  const addUser = () => {
    setAddMode(!addMode); // Toggle addMode between true and false
  };
  const handleEmoji = (e) => {
    console.log(e, "emojizzzz");
    setText((prev) => prev + e.emoji);
    // setOpenEmoji(false);
  };

  const endRef = useRef();

  useEffect(() => {
 endRef.current?.scrollIntoView({ behavior: "smooth" });
    
}, [Text]);

const handleLogout=()=>{
  dispatch(logOut(auth))
}

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
      <div className="flex justify-center items-center h-screen  ">
        <div className="p-5 backdrop-blur-4xl backdrop-saturate-[220%] h-[85vh] w-[90%] bg-[rgba(53,60,88,0.67)] border border-white/10 rounded-xl shadow-inner drop-shadow-2xl shadow-white">
          {/* Flex container for the 3 sections */}
          <div className="flex w-full gap-1">
            {/* Users Section */}
            <div className="users w-[75%]">
              <div className="top flex items-center justify-between ">
                <div className="left flex items-center gap-3">
                  <img
                    src={dp}
                    className="w-[48px] rounded-3xl shadow-sm shadow-white"
                    alt=""
                  />
                  <h1 className="text-white text-xl font-semibold">
                    Howdy, {fetchedUser?.name}
                  </h1>
                </div>
                <div className="right gap-3 flex">
                  <img
                    src={dot}
                    alt=""
                    className=" w-[28px] p-1  rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)]"
                  />
                  <img
                    src={vc}
                    alt=""
                    className=" w-[28px] p-1 rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)]"
                  />
                  <img
                    src={edit}
                    alt=""
                    className=" w-[28px] p-1  rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)]"
                  />
                </div>
              </div>
              <div className="SEARCHBAR  flex border-b-2 p-3 pb-3 ">
                <img
                  src={mag}
                  className="bg-[rgba(53,60,88,0.67)] p-1 w-[35px] cursor-pointer hover:bg-[rgba(191,196,213,0.5)] rounded-lg"
                  alt=""
                />
                <input
                  className="w-[60%] bg-[rgba(53,60,88,0.67)] p-1 hover:bg-[rgba(191,196,213,0.5)] rounded-lg"
                  type="search"
                  placeholder="Search"
                />
                <img
                  src={addMode ? minus : plus} // Toggle between 'minus' and 'plus' icon
                  className="ml-16 bg-[rgba(53,60,88,0.67)] cursor-pointer p-2 rounded-lg w-[35px] hover:bg-[rgba(191,196,213,0.5)]"
                  onClick={addUser}
                  alt="addUser"
                />
              </div>

              {/* chatsPreview */}

              <div className="chats rounded-lg  h-[480px] mt-2 p-1 overflow-auto  scrollbar-thin  scrollbar-thumb-[rgba(191,196,213,0.5)] scrollbar-track-[rgba(53,60,88,0.5)] scrollbar-rounded">
                
                
                <div className=" rounded-lg  hover:bg-[rgba(191,196,213,0.5)] p-1 cursor-pointer flex gap-4 items-center">
                  <div className="pp ">
                    <img
                      src={dp}
                      className="w-[35px] rounded-3xl shadow-sm shadow-white"
                      alt=""
                    />
                  </div>
                  <div className="user text-white">
                    <h1>User 1</h1>
                    <p>Hey Fella!</p>
                  </div>
                </div>



               

               
                  { addMode && <AddUser/> }
              </div>
            </div>

            {/* ************************************************************************************************ */}

            {/* 2nd column/page :::::::::::: Chats Section ::::::::::::::::*/}
            <div className="chats  border-l-2 border-l-[rgba(191,196,213,0.5)] w-[145%] ">
              <div className="upper flex text-white justify-between items-center  border-b-2 pb-1">
                <div className="left ml-4 flex gap-4 rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)] ">
                  <div className="img ">
                    <img
                      src={dp}
                      className="w-[48px] rounded-3xl  cursor-pointer hover:bg-[rgba(191,196,213,0.5)] shadow-sm shadow-white"
                      alt=""
                    />
                  </div>
                  <div className="info  ">
                    <h1>User 1</h1>
                    <p>
                      Hey there, Harnoor's makin chat app for Only Farms!! (Read
                      that Again!){" "}
                    </p>
                  </div>
                </div>
                <div className="rightIcons flex gap-3 mr-2 ">
                  <img
                    src={phone}
                    alt=""
                    className="w-[28px] rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)] p-1"
                  />
                  <img
                    src={vc}
                    alt=""
                    className="w-[28px]  p-1  rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)]"
                  />
                  <img
                    src={info}
                    alt=""
                    className="w-[28px] p-1  rounded-lg cursor-pointer hover:bg-[rgba(191,196,213,0.5)] "
                  />
                </div>
              </div>

              <div className="middle h-[490px]">
                <div className="texts relative mt-1 h-[480px] flex flex-col space-y-2 mx-1 overflow-auto scrollbar-thin  scrollbar-thumb-[rgba(191,196,213,0.5)] scrollbar-track-[rgba(53,60,88,0.5)] scrollbar-rounded">
                  <div className="own flex items-center gap-1 self-end">
                    
                    <div className="text w-[450px] rounded-lg p-2 bg-blue-500 text-white z-10 self-end">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam facere dicta, nesciunt praesentium eveniet sed
                        expedita, quia voluptas fugit inventore itaque ducimus
                        ipsam voluptates. Mollitia debitis eos illo!
                      </p>
                    </div>
                    <img src={dp} className="w-[40px]  rounded-xl " alt="" />
                  </div>

                  <div className="text flex items-center gap-1 self-start">
                    <img src={dp2} className="w-[40px]  rounded-xl " alt="" />

                    <div className="textCon  w-[450px] rounded-lg p-2 bg-yellow-500 z-0 self-start">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Placeat, dolor asperiores? Provident iusto nihil
                        expedita reiciendis impedit commodi maiores accusamus
                        alias molestiae, exercitationem fugit eaque labore, ex
                        facilis.
                      </p>
                    </div>
                  </div>

                  
                <div ref={endRef}></div>
                </div>

                {/* end of middle */}
              </div>
                            {/* end of chats */}
              <div className="lower mt-[-8px]   w-[100%] ">
                <div className="content flex  mx-4 justify-between relative">
                  <img
                    src={img}
                    alt=""
                    className="p-2 hover:bg-[rgba(191,196,213,0.5)] rounded-lg cursor-pointer w-[38px]"
                  />
                  <img
                    src={camera}
                    alt=""
                    className="p-2 hover:bg-[rgba(191,196,213,0.5)] rounded-lg cursor-pointer w-[38px]"
                  />
                  <img
                    src={mic}
                    alt=""
                    className="p-2 hover:bg-[rgba(191,196,213,0.5)] rounded-lg cursor-pointer w-[38px]"
                  />
                  <input
                    type="text"
                    value={Text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a Message..."
                    className="p-2 bg-[rgba(53,60,88,0.67)] hover:bg-[rgba(191,196,213,0.5)] rounded-lg text-white w-[70%]"
                  />
                  <div className="emoji relative">
                    <img
                      src={emoji}
                      onClick={() => setOpenEmoji((prev) => !prev)}
                      alt=""
                      className="p-2 hover:bg-[rgba(191,196,213,0.5)] rounded-lg cursor-pointer w-[38px]"
                    />
                    {OpenEmoji && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10">
                        <EmojiPicker onEmojiClick={handleEmoji} />
                      </div>
                    )}
                  </div>
                  <button className="hover:bg-[rgba(86,235,175,0.67)] shadow-inner shadow-white bg-[rgba(99,96,192,0.5)] p-2 rounded-lg text-white">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/************************************  Profile Section     *****************************/}
            <div className="profile w-[80%] border-l-2 border-l-[rgba(163,169,186,0.5)] ">
              <div>
                <div className="top flex flex-col items-center text-center hover:bg-slate-900 bg-[rgba(191,196,213,0.5)] mx-2 rounded-lg text-white justify-center pb-2">
                    <img src={dp} className=" rounded-[200px] mt-1 w-[80px] shadow-lg shadow-white " alt="" />
                    <h1 className="text-xl mt-1 text-white">User 1</h1>
                    <p className=" text-lg mx-4" >
                      Hey there, Harnoor's makin chat app for Only Farms!! (Read
                      that Again!)
                    </p>
                </div>
              </div>
                                {/* ******accordians****** */}
              <div className="bottom mt-1 cursor-pointer hover:bg-[rgba(191,196,213,0.5)] p-1 rounded-lg text-white mx-2">
                <div className="accordian text-xl flex items-center justify-between ">
                    <h1 className="text-lg" >Chat Settings</h1>
                    <img src={ad} className="w-[27px] bg-slate-900 p-1 rounded-xl" alt="" />
                </div>
              </div>

              <div className="bottom mt-1 cursor-pointer hover:bg-[rgba(191,196,213,0.5)] p-1 rounded-lg text-white mx-2">
                <div className="accordian text-xl flex items-center justify-between ">
                    <h1  className="text-lg">Privacy & Help</h1>
                    <img src={ad} className="w-[27px] bg-slate-900 p-1 rounded-xl" alt="" />
                </div>
              </div>

                            {/* shared photos */}
              <div className="bottom mt-1 cursor-pointer bg-[rgba(191,196,213,0.5)] p-2 rounded-lg text-white mx-2">
                <div className="accordian text-xl flex items-center justify-between ">
                    <h1 className="text-lg" >Shared Photos</h1>
                    <img src={au} className="w-[27px] bg-slate-900 p-1 rounded-xl" alt="" />
                </div>

                <div className="imgShared rounded-xl hover:bg-slate-900 p-1 flex items-center mt-3 justify-between">
                  <div className="flex gap-4">
                  <img src={dp2} className="w-[40px] rounded-lg " alt=""  />
                  <h1>photo_2024_2</h1>
                  </div>
                    <img src={dwnld} className="w-[28px] rounded-xl hover:bg-slate-900 p-1 " alt=""  />
                </div>

                <div className="imgShared rounded-xl hover:bg-slate-900 p-1 flex items-center mt-3 justify-between">
                  <div className="flex gap-4">
                  <img src={dp2} className="w-[40px] rounded-lg " alt=""  />
                  <h1>photo_2024_2</h1>
                  </div>
                    <img src={dwnld} className="w-[28px] rounded-xl hover:bg-slate-900 p-1 " alt=""  />
                </div>



                <div className="imgShared rounded-xl hover:bg-slate-900 p-1 flex items-center mt-3 justify-between">
                  <div className="flex gap-4">
                  <img src={dp2} className="w-[40px] rounded-lg " alt=""  />
                  <h1>photo_2024_2</h1>
                  </div>
                    <img src={dwnld} className="w-[28px] rounded-xl hover:bg-slate-900 p-1 " alt=""  />
                </div>


              </div>

              <div className="bottom mt-1 cursor-pointer hover:bg-[rgba(191,196,213,0.5)] p-1 rounded-lg text-white mx-2">
                <div className="accordian text-xl flex items-center justify-between ">
                    <h1  className="text-lg">Shared Files</h1>
                    <img src={ad} className="w-[27px] bg-slate-900 p-1 rounded-xl" alt="" />
                </div>
              </div>

              <button className="w-[100%] bg-red-600 hover:bg-red-900 mt-1 text-white p-2 rounded-lg mx-2" >Block User</button>
              <button onClick={handleLogout} className="  w-[100%] bg-blue-600 mt-2 hover:bg-blue-900 text-white p-2 rounded-lg mx-2" >Logout</button>
                        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
