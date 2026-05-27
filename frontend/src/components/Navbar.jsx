import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-light mb-4 p-3 rounded shadow">
      {/* NAVBAR */}

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Link className="btn btn-primary" to="/">
          Panelist
        </Link>

        <Link className="btn btn-success" to="/candidate">
          Candidate
        </Link>

        <Link className="btn btn-warning" to="/matches">
          Matches
        </Link>

        <Link className="btn btn-info" to="/schedule">
          Schedule
        </Link>

        <Link className="btn btn-dark" to="/upcoming">
          Upcoming
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
