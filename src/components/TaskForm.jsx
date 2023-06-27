import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function TaskForm() {
  const [task, setTask] = useState({ checked: false });
  const [allTask, setAllTask] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleAddTask = () => {
    axios
      .post("http://localhost:3000/tasks", {
        task: task["task"],
        date: task["date"],
        checked: task["checked"],
      })
      .then((response) => setTask({ ...task }));
  };
  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => setAllTask(response.data))
      .catch((error) => console.log(error));
  });

  const handleDeleteTask = (index) => {
    const taskToDelete = allTask[index];

    axios
      .delete(
        `http://localhost:3000/tasks/${taskToDelete ? taskToDelete.id : 1}`
      )
      .then((response) => {
        const deleteTasks = allTask.filter((_, i) => i !== index);
        setAllTask(deleteTasks);
        alert("Task deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting task:", error);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "450px",
          height: "600px",
          backgroundColor: "#edeceb",
          border: " 1px solid #5D8AA8",
          margin: "20px auto",
          overflowY: "auto",
        }}
      >
        <h2 style={{ display: "flex", justifyContent: "space-around" }}>
          Task Form
          <span>
            <Button variant="danger">Close</Button>{" "}
          </span>
        </h2>
        <h6 style={{ paddingLeft: "15px" }}>Task:</h6>
        <input
          type="text"
          id="task"
          value={task["task"]}
          placeholder="Add Task"
          style={{ border: "none", outline: "none", width: "100%" }}
          onChange={(e) => handleChange(e)}
        ></input>{" "}
        <br></br> <br></br>
        <h6 style={{ paddingLeft: "15px" }}>Day & Time: </h6>
        <input
          id="date"
          value={task["date"]}
          type="text"
          placeholder="Add Day & Time"
          style={{ border: "none", outline: "none", width: "100%" }}
          onChange={(e) => handleChange(e)}
        ></input>{" "}
        <br></br> <br></br>
        <p style={{ display: "flex", justifyContent: "space-around" }}>
          <b>Set Reminder</b>
          <span>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(!checked);
                setTask({ ...task, checked: e.target.checked });
              }}
            ></input>
          </span>
        </p>
        <Button
          variant="dark"
          onClick={() => handleAddTask()}
          style={{ width: "300px", marginLeft: "70px" }}
        >
          Save Task
        </Button>
        <div>
          <ul style={{ marginTop: "20px" }}>
            {allTask.length === 0 ? (
              <p>No Task To Show</p>
            ) : (
              allTask.map((e, index) =>
                e.checked ? (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      gap: "8px",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#faf7f5",
                      marginRight: "30px",
                      borderLeft: "5px solid #53A079",
                    }}
                  >
                    <p style={{ paddingTop: "15px" }}>
                      {e.task}
                      <span
                        style={{
                          color: "red",
                          marginLeft: "40px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                          onClick={() => handleDeleteTask(e.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </span>
                    </p>
                    <p>{e.date}</p>
                  </li>
                ) : (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      gap: "8px",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#faf7f5",
                      marginRight: "30px",
                    }}
                  >
                    <p style={{ paddingTop: "15px" }}>
                      {e.task}
                      <span
                        style={{
                          color: "red",
                          marginLeft: "40px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className="bi bi-x"
                          viewBox="0 0 16 16"
                          onClick={() => handleDeleteTask(e.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </span>
                    </p>
                    <p>{e.date}</p>
                  </li>
                )
              )
            )}
            {/* {allTask.map((e, index) =>
              e.checked ? (
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "8px",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#faf7f5",
                    marginRight: "30px",
                    borderLeft: "5px solid #53A079",
                  }}
                >
                  <p style={{ paddingTop: "15px" }}>
                    {e.task}
                    <span
                      style={{
                        color: "red",
                        marginLeft: "40px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                        onClick={() => handleDeleteTask(e.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </span>
                  </p>
                  <p>{e.date}</p>
                </li>
              ) : (
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "8px",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#faf7f5",
                    marginRight: "30px",
                  }}
                >
                  <p style={{ paddingTop: "15px" }}>
                    {e.task}
                    <span
                      style={{
                        color: "red",
                        marginLeft: "40px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                        onClick={() => handleDeleteTask(e.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </span>
                  </p>
                  <p>{e.date}</p>
                </li>
              )
            )} */}
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>
              <b>MiniProJect API & Asynchronous &copy; 2023</b>
            </p>
            <a>
              <b>About</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
