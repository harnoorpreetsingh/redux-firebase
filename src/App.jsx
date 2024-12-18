import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import MainScreen from "./components/pages/MainScreen";
import SignUpAndLogin from "./components/pages/SignUpAndLogin";
import { auth } from "./firebase/config";
import { fetchUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading screen

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Start loading when checking the auth state
      if (currentUser) {
        setUser(currentUser);
        try {
          // Fetch user data from Redux or API
          await dispatch(fetchUser(currentUser.uid)).unwrap();
          console.log("Current user data fetched:", currentUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user logged in");
        setUser(null); // Reset user state if no one is logged in
      }
      setLoading(false); // Stop loading once auth state is determined
    });

    return () => unsub(); // Clean up the subscription
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Loading screen until Firebase auth state is checked
  }

  return (
      <BrowserRouter>
    <Routes>
      {/* Route for /home only if the user is logged in */}
      <Route path="/home" element={user ? <MainScreen /> : <SignUpAndLogin />} />

      {/* Default route for when the user is not logged in */}
      <Route path="/" element={user ? <MainScreen /> : <SignUpAndLogin />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

