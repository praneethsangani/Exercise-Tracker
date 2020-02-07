import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Button href={"/Exercise-Tracker/edit/" + props.exercise._id}>edit</Button>
            <span> </span>
            <Button href="#" onClick={() => {
                props.deleteExercise(props.exercise._id)
            }}>delete</Button>
        </td>
    </tr>
);

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('https://praneethsangani.github.io/Exercise-Tracker/exercises/')
            .then(response => {
                this.setState({exercises: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('https://praneethsangani.github.io/Exercise-Tracker/exercises/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        }).map(currentExercises => {
            return <Exercise exercise={currentExercises} deleteExercise={this.deleteExercise}
                             key={currentExercises._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>User</th>
                        <th>Workout</th>
                        <th>Duration (Min)</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}