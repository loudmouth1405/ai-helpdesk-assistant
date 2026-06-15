import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [token, setToken] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [aiResult, setAiResult] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingTicket, setLoadingTicket] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      loadTickets(savedToken);
    }
  }, []);

  const login = async () => {
    try {
      setLoadingLogin(true);

      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setToken(res.data.token);

      setMessage("Login Successful");

      loadTickets(res.data.token);
    } catch (error) {
      setMessage("Login Failed");
    } finally {
      setLoadingLogin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken("");
    setTickets([]);
    setAiResult(null);

    setEmail("");
    setPassword("");

    setTitle("");
    setDescription("");

    setMessage("Logged Out");
  };

  const getSuggestions = async () => {
    if (!title || !description) {
      setMessage("Please enter issue title and description");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await axios.post(
        `${API_URL}/ai/troubleshoot`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAiResult(res.data);

      setMessage("AI Suggestions Generated");
    } catch (error) {
      console.error(error);
      setMessage("Failed to Get AI Suggestions");
    } finally {
      setLoadingAI(false);
    }
  };

  const markResolved = async () => {
    try {
      await axios.post(
        `${API_URL}/ai/resolve`,
        {
          sessionId: aiResult.sessionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Issue Resolved Successfully");

      setAiResult(null);

      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("Failed to Mark Resolved");
    }
  };

  const createTicket = async () => {
    try {
      setLoadingTicket(true);

      await axios.post(
        `${API_URL}/tickets`,
        {
          title,
          description,
          category: aiResult.category,
          priority: aiResult.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Ticket Created Successfully");

      setAiResult(null);

      setTitle("");
      setDescription("");

      loadTickets(token);
    } catch (error) {
      setMessage("Failed to Create Ticket");
    } finally {
      setLoadingTicket(false);
    }
  };

  const loadTickets = async (authToken = token) => {
    try {
      const res = await axios.get(`${API_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <div className="header">
        <h1 className="main-title">
          AI Helpdesk Assistant
        </h1>

        {token && (
          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      {!token && (
        <div className="card">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={login}
            disabled={loadingLogin}
          >
            {loadingLogin
              ? "Logging In..."
              : "Login"}
          </button>
        </div>
      )}

      {token && (
        <>
          <div className="card">
            <h2>Raise New Issue</h2>

            <input
              type="text"
              placeholder="Issue Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              rows="5"
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <button
              onClick={getSuggestions}
              disabled={loadingAI}
            >
              {loadingAI
                ? "Generating..."
                : "Get AI Suggestions"}
            </button>
          </div>

          {aiResult && (
            <div className="card">
              <h2>AI Analysis</h2>

              <div className="info-row">
                <strong>Category:</strong>{" "}
                {aiResult.category}
              </div>

              <div className="info-row">
                <strong>Priority:</strong>{" "}
                {aiResult.priority}
              </div>

              <h3>
                Suggested Troubleshooting Steps
              </h3>

              <ul>
                {aiResult.suggestions.map(
                  (step, index) => (
                    <li key={index}>
                      {step}
                    </li>
                  )
                )}
              </ul>

              <div className="btn-group">
                <button
                  className="success-btn"
                  onClick={markResolved}
                >
                  Problem Resolved
                </button>

                <button
                  className="ticket-btn"
                  onClick={createTicket}
                  disabled={loadingTicket}
                >
                  {loadingTicket
                    ? "Creating..."
                    : "Create Ticket"}
                </button>
              </div>
            </div>
          )}

          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2>My Tickets</h2>

              <button
                onClick={() =>
                  loadTickets()
                }
              >
                Refresh
              </button>
            </div>

            {tickets.length === 0 ? (
              <p>No Tickets Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.title}</td>
                      <td>{ticket.category}</td>
                      <td>{ticket.priority}</td>
                      <td>{ticket.status}</td>
                      <td>
                        {ticket.createdDate
                          ? new Date(
                              ticket.createdDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;