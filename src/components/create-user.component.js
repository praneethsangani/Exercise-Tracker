import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDeleteUsername = this.onChangeDeleteUsername.bind(this);
        this.onChangeUpdateUsername = this.onChangeUpdateUsername.bind(this);
        this.onSubmitAdd = this.onSubmitAdd.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);

        this.state = {
            users: [],
            deleteList: [],
            updateList: [],
            addUsername: '',
            updateUsername: '',
            deleteUsername: ''
        }
    };

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data,
                        deleteUsername: response.data[0].username,
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

    onSubmitAdd(e) {
        e.preventDefault();

        const user = {
            addUsername: this.state.addUsername
        };

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            addUsername: ''
        })
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
        console.log(id);

        axios.delete('http://localhost:5000/users/' + id)
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
                <form onSubmit={this.onSubmitDelete}>
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
                        <label>Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.updateUsername}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}