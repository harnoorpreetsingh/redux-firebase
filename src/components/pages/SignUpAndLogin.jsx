import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, login, loginWithGoogle, signUpWithGoogle } from "../../redux/features/userSlice.js"; 
import { auth } from "../../firebase/config.js";
import bg from "/bg.jpg";
import favicon from "../../assets/icons/favicon.png";
import { useState } from "react";

const SignUpAndLogin = () => {

  const [Avatar, setAvatar] = useState({
    file:null,
    url:""
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
   

    console.log(data, "daddada")
    // dispatch(createUser({ name:data.name, email: data.email, password: data.password }));
    dispatch(createUser(data));
  };

  const sUGoogle = (auth) => {
    dispatch(signUpWithGoogle(auth));
  };



  const handleAvatar=(e)=>{
    if(e.target.files[0]){
      setAvatar({
        file:e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
   
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

        <div className="main ">

        <h1 className="text-3xl text-white text-center">Welcome to Real-Time Chat!</h1>
        <div className="forms flex ">

      {/* Sign-up Form */}
      <div className="register w-full sm:w-1/2 flex justify-center p-8 max-h-[80vh] overflow-y-auto  border-gray-400">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[500px] p-2 bg-transparent rounded-xl hover:shadow-inner hover:shadow-yellow-200">
            
            <h1 className="text-2xl text-white text-center mb-3 font-semibold">REGISTER</h1>


            <div className="mb-2 ">
            <label  htmlFor="file" className="text-white cursor-pointer  text-lg flex items-center justify-end mr-4 gap-2 underline " >
              <img src={Avatar.url || favicon} className="w-[40px]" alt="" />
              Choose a Chat Avatar</label>
            <input type="file" className="  hidden " id="file" onChange={handleAvatar}/>
              {errors.file && <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>}
            </div>


            {/* Name Input */}
            <div className="mb-4">
              <input
                className="w-full p-4 focus:bg-transparent bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                type="text"
                placeholder="Name"
                {...register("name", { 
                  required: "Name is required", 
                  pattern: {
                    message: "Enter a valid name"
                  }
                })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                className="w-full p-4 focus:bg-transparent bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                type="email"
                placeholder="Email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                className="w-full p-4 focus:bg-transparent bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                type="password"
                placeholder="Password"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              className="w-full p-4 mt-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
              type="submit"
            >
              Register
            </button>

            <h1 className="text-center mt-2 text-gray-400">OR</h1>

            {/* Google Sign-Up Button */}
            <button onClick={() => sUGoogle(auth)} className="w-full p-4 mt-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition duration-300">
              Sign Up with Google
            </button>
          </form>
        </div>

        
     <Login  />
     
          </div>

        </div>
          
      </div>
      </div>

    </div>

  );

};



export const Login=()=>{
  const { register, handleSubmit, formState: { errors },  } = useForm();
  const dispatch = useDispatch();

  const handleLogin = ( data) => {
    console.log(data, "login cdadaddad")
    // e.preventDefault()
    dispatch(login({ email: data.email, password: data.password }))
    console.log("logged minnnn")
    // reset();
   
  };


  const handleGLogin = (auth) => {
    dispatch(dispatch(loginWithGoogle(auth)))
  };

   {/* Login Form */}
return(
  <div className="login w-full sm:w-1/2 flex justify-center p-8 max-h-[80vh] overflow-y-auto">
  <form onSubmit={handleSubmit(handleLogin)} className="w-full sm:w-[500px] p-8 bg-transparent rounded-xl  hover:shadow-inner hover:shadow-yellow-200">
    <h1 className="text-2xl text-center mb-2 font-semibold text-white">LOGIN</h1>
    
    {/* Name Input */}
 

    {/* Email Input */}
    <div className="mb-6">
      <input
        className="w-full p-4 focus:bg-transparent bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
        type="email"
        placeholder="Email"
        {...register("email", { 
          required: "Email is required", 
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Enter a valid email address"
          }
        })}
      />
      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
    </div>

    {/* Password Input */}
    <div className="mb-6">
      <input
        className="w-full p-4 focus:bg-transparent bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
        type="password"
        placeholder="Password"
        {...register("password", { 
          required: "Password is required", 
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })}
      />
      {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
    </div>

    {/* Submit Button */}
    <button
    
      className="w-full p-4 mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
      type="submit"
    >
      Login
    </button>

    <h1 className="text-center mt-6 text-gray-400">OR</h1>

    {/* Google Login Button */}
    <button onClick={() => handleGLogin(auth)} className="w-full p-4 mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition duration-300">
      Login with Google
    </button>
  </form>
</div>
)

}


export default SignUpAndLogin;


