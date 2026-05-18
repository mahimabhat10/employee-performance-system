
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

  const fetchEmployees = async () => {

    const res = await axios.get(
      "https://employee-backend-4txf.onrender.com/"
    );

    setEmployees(res.data);
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

    const payload = {
      ...formData,
      skills: formData.skills.split(",")
    };

    await axios.post(
      "https://employee-backend-4txf.onrender.com/api/employees",
      payload
    );

    const aiRes = await axios.post(
      "https://employee-backend-4txf.onrender.com/api/ai/recommend",
      payload
    );

    setRecommendation(
      aiRes.data.recommendation
    );

    fetchEmployees();

    alert("Employee Added Successfully");

    setFormData({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: ""
    });
  };

  const filteredEmployees =
    employees.filter((emp) =>
      emp.department
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div
      style={{
        background:
          "linear-gradient(to right,#e9d5ff,#f5d0fe)",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Poppins"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#6b21a8",
          fontSize: "42px",
          marginBottom: "30px"
        }}
      >
        AI Employee Performance System
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "650px",
          margin: "auto",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            color: "#9333ea",
            marginBottom: "20px"
          }}
        >
          Add Employee
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="performanceScore"
            placeholder="Performance Score"
            value={formData.performanceScore}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            style={inputStyle}
          />

          <button style={buttonStyle}>
             Add Employee
          </button>

        </form>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >

        <h2
          style={{
            color: "#7e22ce"
          }}
        >
          AI Recommendation
        </h2>

        <p
          style={{
            color: "#6b21a8",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          {recommendation}
        </p>

      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Search by Department"
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "320px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        />

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "40px"
        }}
      >

        {
          filteredEmployees.map((emp) => (

            <div
              key={emp._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.1)",
                transition: "0.3s"
              }}
            >

              <h2
                style={{
                  color: "#9333ea"
                }}
              >
                {emp.name}
              </h2>

              <p>
                <b>Email:</b> {emp.email}
              </p>

              <p>
                <b>Department:</b>
                {emp.department}
              </p>

              <p>
                <b>Skills:</b>
                {emp.skills.join(", ")}
              </p>

              <p>
                <b>Score:</b>
                {emp.performanceScore}
              </p>

              <p>
                <b>Experience:</b>
                {emp.experience} years
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
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #d8b4fe",
  outline: "none",
  fontSize: "15px"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(to right,#a855f7,#d946ef)",
  color: "white",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "bold",
  boxShadow:
    "0 6px 15px rgba(168,85,247,0.4)"
};

export default App;