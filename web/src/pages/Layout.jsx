import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Layout = () => {
  const { currentUser } = useAuth();

  // Example conversion data (A/B testing results)
  const data = [
    { variant: "Variant A", conversions: 120, users: 500 },
    { variant: "Variant B", conversions: 180, users: 550 },
  ];

  // Conversion rate calculation
  const chartData = data.map(item => ({
    variant: item.variant,
    rate: ((item.conversions / item.users) * 100).toFixed(2),
  }));

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <div className="layout">
      {/* navbar */}
      <nav className="navbar">
        <h1>A/B Testing Dashboard</h1>
        <div className="nav-right">
          <span>{currentUser?.displayName || currentUser?.email}</span>
          <button onClick={handleSignOut} className="btn logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* A/B Testing Section */}
      <section className="ab-section">
        <h2>A/B Testing Experiment</h2>
        <p>
          We are comparing <b>Variant A</b> and <b>Variant B</b> to measure
          conversion rates.
        </p>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <h2>Conversion Rates</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="variant" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rate" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 A/B Testing Project | Powered by React + Firebase</p>
      </footer>
    </div>
  );
};

export default Layout;
