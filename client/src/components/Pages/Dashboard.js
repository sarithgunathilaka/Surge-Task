import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            users: null,
            isUsers:null
        };
    }
    
    
    async componentDidMount() {
        const url = 'users/viewUsers';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({users: data.message, isUsers:data.success, loading:false})
        console.log('data', this.isUsers);
    }
    
    
    
    render() {
        if (this.state.loading){
            return <div>loading...</div>
        }
        
        if (this.state.isUsers == null){
            return <div>No Users Found!</div>
        }

        if (this.state.users){
            const userList = this.state.users.map(users => {
                return (
                    <tr>
                        <td>{users.firstName}</td>
                        <td>{users.lastName}</td>
                        <td>{users.email}</td>
                    </tr>
                ) 
            })
                return (
                    <div className="container">
                    <h2>Members</h2>
                    <p>Total users: {userList.length}</p>
                    <Table dark>
                        <thead>
                            <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                            <tbody>
                                {userList}
                            </tbody>
                    </Table>
                    </div>
                );

        }
    }       
}
