import { useState } from "react";
import favicon from "../../assets/icons/favicon.png";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false); // To close the modal
  };

  if (!isOpen) return null; // Don't render anything if modal is closed

  return (
    <>
      {/* Overlay to dull and blur the background */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 backdrop-blur-md z-10"></div>

      {/* Modal */}
      <div className="addUser absolute shadow-2xl border border-double hover:shadow-2xl hover:shadow-white border-orange-400 shadow-white m-auto w-max h-max top-0 bottom-0 left-0 right-0 hover:bg-gray-900 bg-gray-700 z-20 p-8 rounded-xl">
       <div className="close bg-orange-400">
          {/* Close Button */}
          <button
          onClick={closeModal}
          className="absolute top-8 left-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
        >
          &times;
        </button>
       </div>
        <div className="flex gap-4">
          <input
            type="text"
            className="ml-5 bg-slate-500 border text-white focus:shadow-lg focus:shadow-white p-2 rounded-lg w-[100%]"
            name="username"
            placeholder="Username"
          />
          <button className="bg-amber-700 hover:bg-white hover:text-black text-white p-2 rounded-lg">
            Search
          </button>
        </div>

        <div className="user">
          <div className="detail flex gap-7 rounded-lg items-center mt-8 border p-2 bg-slate-700">
            <img src={favicon} alt="" className="w-[40px]" />
            <span className="text-white">Randy Orton</span>
            <button className="bg-blue-700 hover:bg-green-700 text-white p-2 rounded-lg">
              Add User
            </button>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default AddUser;
