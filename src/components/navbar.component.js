import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/Exercise-Tracker/" className="navbar-brand">Exercise Tracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/Exercise-Tracker/" className="nav-link">View Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Exercise-Tracker/create" className="nav-link">Log Exercise</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Exercise-Tracker/user" className="nav-link">Manage Users</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}