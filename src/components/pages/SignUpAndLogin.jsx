import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/userSlice.js"; // Import your action

const SignUpAndLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // Dispatch your action with form data
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="bg-black text-blue-500 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 p-6 bg-gray-800 rounded-lg shadow-md">
        
        {/* Email Input */}
        <div className="mb-4">
          <input
            className="w-full p-3 bg-gray-900 text-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-600"
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
            className="w-full p-3 bg-gray-900 text-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-600"
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
          className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpAndLogin;
