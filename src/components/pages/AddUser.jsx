import { useState } from "react";
import favicon from "../../assets/icons/favicon.png";
import { collection,  getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "sonner";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [User, setUser] = useState(null);

  const closeModal = () => {
    setIsOpen(false); // To close the modal
  };

  if (!isOpen) return null; // Don't render anything if modal is closed

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData, "formmmmm");
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("name", "==", username));
      // console.log(q, "queryyyyyyyyy")

      const querySnapShot = await getDocs(q);
      // console.log(querySnapShot.docs, "qsssssss")

      if (!querySnapShot.empty) {
        // setUser(querySnapShot.docs[0].data()); //gives only 1 result 
        setUser(querySnapShot.docs); //gives all matching results
        // console.log(User[0].data(), "datatatatatat")
        const mapableData = User.map((user)=>{
          // const data= user.data()
          // return user //to return data on index[0,1,2,3,4], basically all
          return user.data() //to return data on index[0,1,2,3,4], basically all
        })  
        setUser(mapableData)
      }
      else{
        toast.error("Not Found!")
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <>
      {/* Overlay to dull and blur the background */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 backdrop-blur-md z-10"></div>

      {/* Modal */}
      <div className="addUser absolute shadow-2xl border border-double hover:shadow-2xl hover:shadow-white border-orange-400 shadow-white m-auto w-max h-max top-0 bottom-0 left-0 right-0 hover:bg-gray-900 bg-gray-700 z-20 p-8 rounded-xl">
        <div className="close bg-orange-400">
        
        </div>


        <form onSubmit={handleSearch}>
        <div className="flex gap-4">
          <input
            type="text"
            className="ml-5 bg-slate-500 border text-white focus:shadow-lg focus:shadow-white p-2 rounded-lg w-[100%]"
            name="username"
            placeholder="Username"
          />
          <button
            className="bg-amber-700 hover:bg-white hover:text-black text-white p-2 rounded-lg"
          >
            Search
          </button>
        </div>
        </form>

       {}

       {
        // if(!User)return;
        User?.map((user)=>{
          if(!user)return;
return (
  <>
  <div className="user">
            <div className="detail flex gap-7 rounded-lg items-center mt-8 border p-2 bg-slate-700" key={user.id}>
              <img src={user.avatar || favicon} alt="" className="w-[40px]" />
              <span className="text-white">{user.name}</span>
              <button className="bg-blue-700 hover:bg-green-700 text-white p-2 rounded-lg">
                Add User
              </button>
            </div>
          </div>
  </>
)
        })
       }
         
          
        

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
