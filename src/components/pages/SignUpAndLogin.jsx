import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser, signUpWithGoogle } from "../../redux/features/userSlice.js"; 
import { auth } from "../../firebase/config.js";
import bg from "/bg.jpg";

const SignUpAndLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  const sUGoogle = (auth) => {
    dispatch(signUpWithGoogle(auth));
  };

  const handleLogin = () => {
    // handle login logic here
  };

  return (
    <div className="maindiv bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-tl from-gray-700 to-gray-900 shadow-2xl text-white w-full max-w-6xl flex rounded-xl overflow-hidden">
        
        {/* Sign-up Form */}
        <div className="register w-full sm:w-1/2 flex justify-center p-8 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[500px] p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg border-2 border-gray-600">
            
            <h1 className="text-2xl text-center mb-6 font-semibold">REGISTER</h1>

            {/* Name Input */}
            <div className="mb-6">
              <input
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
            <div className="mb-6">
              <input
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
              Register
            </button>

            <h1 className="text-center mt-6 text-gray-400">OR</h1>

            {/* Google Sign-Up Button */}
            <button onClick={() => sUGoogle(auth)} className="w-full p-4 mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition duration-300">
              Sign Up with Google
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="login w-full sm:w-1/2 flex justify-center p-8 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleLogin} className="w-full sm:w-[500px] p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg border-2 border-gray-600">
            <h1 className="text-2xl text-center mb-6 font-semibold">LOGIN</h1>
            
            {/* Name Input */}
            <div className="mb-6">
              <input
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
            <div className="mb-6">
              <input
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
                className="w-full p-4 bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
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
            <button onClick={() => sUGoogle(auth)} className="w-full p-4 mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition duration-300">
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpAndLogin;
