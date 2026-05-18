import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [employees, setEmployees] = useState([]);
  const [recommendation, setRecommendation] =
    useState("");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const API =
    "https://employee-backend-4txf.onrender.com";

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        `${API}/api/employees`
      );

      setEmployees(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,
        skills: formData.skills.split(",")
      };

      await axios.post(
        `${API}/api/employees`,
        payload
      );

      const aiRes = await axios.post(
        `${API}/api/ai/recommend`,
        payload
      );

      setRecommendation(
        aiRes.data.recommendation
      );

      fetchEmployees();

      alert("Employee Added");

    } catch (error) {

      console.log(error);
    }
  };

  const filteredEmployees =
    employees.filter((emp) =>
      emp.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div
      style={{
        background:
          "linear-gradient(to right,#e9d5ff,#f5d0fe)",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#7e22ce"
        }}
      >
        AI Employee Performance System
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "600px",
          margin: "auto"
        }}
      >

        <form onSubmit={handleSubmit}>

          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="text"
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="number"
            name="performanceScore"
            placeholder="Performance Score"
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            type="number"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
          />

          <button style={buttonStyle}>
            Add Employee
          </button>

        </form>

      </div>

      <h2
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#7e22ce"
        }}
      >
        AI Recommendation
      </h2>

      <p
        style={{
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        {recommendation}
      </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >

        <input
          style={searchStyle}
          type="text"
          placeholder="Search Department"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        {
          filteredEmployees.map((emp) => (

            <div
              key={emp._id}
              style={cardStyle}
            >

              <h3>{emp.name}</h3>

              <p>{emp.email}</p>

              <p>{emp.department}</p>

              <p>
                {emp.skills?.join(", ")}
              </p>

              <p>
                Score:
                {emp.performanceScore}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(to right,#a855f7,#d946ef)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer"
};

const searchStyle = {
  padding: "12px",
  width: "300px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "20px"
};

export default App;