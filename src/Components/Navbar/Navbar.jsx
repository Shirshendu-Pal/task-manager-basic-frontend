import React from "react";

const Navbar = ({ setStatus, fetchData, handleOpenModal}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex align-items-center justify-content-between w-100">
        <a className="navbar-brand" href="#">
          LOGO
        </a>

        <div className="d-flex align-items-center gap-1">
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </button>
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              id="filter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-funnel"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
              </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="filter">
              <li>
                <span
                  className="dropdown-item btn"
                  onClick={() => setStatus("")}
                >
                  Show All
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item btn"
                  onClick={() => setStatus("true")}
                >
                  Complete
                </span>
              </li>
              <li>
                <span
                  className="dropdown-item btn"
                  onClick={() => setStatus("false")}
                >
                  Incomplete
                </span>
              </li>
            </ul>
          </div>

          <button className="btn btn-outline-primary" onClick={fetchData}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
