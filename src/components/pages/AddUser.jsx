import { useState } from "react";
import favicon from "../../assets/icons/favicon.png";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "sonner";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const AddUser = ({ setAddMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [User, setUser] = useState([]);

  const currentUser = useSelector((state) => state.user.userData);
  // console.log(curentUser.id, "curentUser")
  const closeModal = () => {
    setIsOpen(false); // To close the modal
    setAddMode(false); // does the button back to '+'
  };

  if (!isOpen) return null; // Don't render anything if modal is closed

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    // *************************::::::::::::::::::::::::::::::::::::::::::::::********************
    // *************************:::::::: Search User with query STARTS :::::::********************
    // *************************::::::::::::::::::::::::::::::::::::::::::::::********************
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("name", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const dataInVar = querySnapShot.docs.map((elem) => {
          return elem.data();
        });
        setUser(dataInVar);
        console.log(User, "user dets");
      } else {
        toast.error("Not Found!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // *************************:::::::::::::::::::::::::::::::::::::::::::::::********************
  // **************************:::::::: Search User with query ENDS  ::::::::********************
  // **************************::::::::::::::::::::::::::::::::::::::::::::::********************

  // *************************:::::::: ----- ADD User to List ----  STARTS :::::::********************

  const handleAdd = async (e, user) => {
    e.preventDefault();

    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {
      // 1. Create a new chat document in Firestore
      const newChatRef = doc(chatRef); // Reference for new chat document
      await setDoc(newChatRef, {
        updatedAt: serverTimestamp(),
        messages: [],
      });

      // 2. Fetch current user and target user chat lists
      const currentUserChatsSnap = await getDoc(
        doc(userChatRef, currentUser.id)
      );
      const userChatsSnap = await getDoc(doc(userChatRef, user.id));

      const currentUserChats = currentUserChatsSnap.exists()
        ? currentUserChatsSnap.data().chats
        : [];
      const userChats = userChatsSnap.exists()
        ? userChatsSnap.data().chats
        : [];

      // 3. Check if chat already exists based on chat ID or user email
      const chatExistsForCurrentUser = currentUserChats.some(
        (chat) => chat.receiverId === user.id && chat.chatId === newChatRef.id
      );
      const chatExistsForUser = userChats.some(
        (chat) =>
          chat.receiverId === currentUser.id && chat.chatId === newChatRef.id
      );

      // 4. Check if user email or ID already exists in the user's chat list
      const userAlreadyInCurrentUserChat = currentUserChats.some(
        (chat) => chat.receiverId === user.id
      );
      const userAlreadyInTargetUserChat = userChats.some(
        (chat) => chat.receiverId === currentUser.id
      );

      if (
        chatExistsForCurrentUser ||
        chatExistsForUser ||
        userAlreadyInCurrentUserChat ||
        userAlreadyInTargetUserChat
      ) {
        toast.error("User is already in this chat.");
        return; // Exit if chat already exists or user is already in the chat
      } else {
        // 5. Add the chat to both users' chat lists if no duplicate found
        const chatDataForCurrentUser = {
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        };

        const chatDataForUser = {
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        };

        // 6. Update the current user's chat list (ensure atomic update)
        await updateDoc(doc(userChatRef, currentUser.id), {
          chats: arrayUnion(chatDataForCurrentUser),
        });

        // 7. Update the target user's chat list (ensure atomic update)
        await updateDoc(doc(userChatRef, user.id), {
          chats: arrayUnion(chatDataForUser),
        });

        toast.success("User added to chat!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding user to chat.");
    }
  };

  // *************************:::::::: ------ ADD User ----  ENDSS :::::::********************

  return (
    <>
      {/* Overlay to dull and blur the background */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 backdrop-blur-md z-10"></div>

      {/* Modal */}
      <div className="addUser absolute shadow-2xl border border-double hover:shadow-2xl hover:shadow-white border-orange-400 shadow-white m-auto w-max h-max top-0 bottom-0 left-0 right-0 hover:bg-gray-900 bg-gray-700 z-20 p-8 rounded-xl">
        <div className="close bg-orange-400"></div>

        <form onSubmit={handleSearch}>
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
        </form>

        {}
        {/* *************************:::::::::::::::::::::::::::::::::::::::::::::::********************
         ****************************:::::::::::::::  MAP User   :::::::::::::::::::********************
         ****************************:::::::::::::::::::::::::::::::::::::::::::::::********************/}
        {User?.map((user) => {
          if (!user) return;
          return (
            <>
              <div className="user">
                <div
                  className="detail flex justify-between gap-7 rounded-lg items-center mt-8 border p-2 bg-slate-700"
                  key={user.id}
                >
                  <img
                    src={user.avatar || favicon}
                    alt=""
                    className="w-[40px]"
                  />
                  <span className="text-white">{user.name}</span>
                  <span className="text-white">{user.email}</span>
                  <button
                    onClick={(e) => handleAdd(e, user)}
                    className="bg-blue-700 hover:bg-green-700 text-white p-2 rounded-lg"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </>
          );
        })}

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-8 left-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default AddUser;
