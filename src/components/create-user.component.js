import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDeleteUsername = this.onChangeDeleteUsername.bind(this);       // Should probably move these into their own components but alas
        this.onChangeUpdateUsername = this.onChangeUpdateUsername.bind(this);
        this.onChangeUpdateNewUsername = this.onChangeUpdateNewUsername.bind(this);
        this.onSubmitAdd = this.onSubmitAdd.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);

        this.state = {
            users: [],
            deleteList: [],
            updateList: [],
            addUsername: '',
            updateUsername: '',
            deleteUsername: '',
            updateNewUsername: '',
        }
    };

    componentDidMount() {
        axios.get('https://praneethsangani.github.io/Exercise-Tracker/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data,
                        deleteUsername: response.data[0].username,
                        updateUsername: response.data[0].username,
                        deleteList: response.data.map(user => user.username),
                        updateList: response.data.map(user => user.username)
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        this.setState({
            addUsername: e.target.value
        })
    }

    onChangeDeleteUsername(e) {
        this.setState({
            deleteUsername: e.target.value
        })
    }

    onChangeUpdateUsername(e) {
        this.setState({
            updateUsername: e.target.value
        })
    }

    onChangeUpdateNewUsername(e) {
        this.setState({
            updateNewUsername: e.target.value
        })
    }

    onSubmitAdd(e) {
        e.preventDefault();

        const user = {
            username: this.state.addUsername
        };

        axios.post('https://praneethsangani.github.io/Exercise-Tracker/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            addUsername: ''
        });

        window.location = '/user';
    }

    onSubmitDelete(e) {
        e.preventDefault();

        let id;
        for (let i = 0; i < this.state.users.length; i++) {
            console.log(this.state.users[i].username + ":" + this.state.deleteUsername);
            if (this.state.users[i].username === this.state.deleteUsername) {
                id = this.state.users[i]._id;
            }
        }

        axios.delete('https://praneethsangani.github.io/Exercise-Tracker/users/' + id)
            .then(response => {
                console.log(response.data)
            });

        window.location = '/user';
    }

    onSubmitUpdate(e) {
        e.preventDefault();

        let id;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username === this.state.updateUsername) {
                id = this.state.users[i]._id;
            }
        }

        const user = {
            username: this.state.updateNewUsername
        };

        axios.post('https://praneethsangani.github.io/Exercise-Tracker/users/update/' + id, user)
            .then(response => {
                console.log(response.data)
            });

        window.location = '/user';
    }

    render() {
        return (
            <div>
                <h3>Add User</h3>
                <form onSubmit={this.onSubmitAdd}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.addUsername}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>

                <br/>

                <h3>Delete User</h3>
                <form onSubmit={this.onSubmitDelete}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.deleteUsername}
                                onChange={this.onChangeDeleteUsername}>
                            {
                                this.state.deleteList.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-primary"/>
                    </div>
                </form>

                <br/>

                <h3>Update User</h3>
                <form onSubmit={this.onSubmitUpdate}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.updateUsername}
                                onChange={this.onChangeUpdateUsername}>
                            {
                                this.state.updateList.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>New Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.updateNewUsername}
                               onChange={this.onChangeUpdateNewUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}