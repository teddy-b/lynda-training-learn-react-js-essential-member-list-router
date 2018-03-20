import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Member from './Member'

class MemberList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      loading: false,
      administrators: []
    }
    this.makeAdmin = this.makeAdmin.bind(this)
    this.removeAdmin = this.removeAdmin.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('https://api.randomuser.me/?nat=US&results=12')
      .then(response => response.json())
      .then(json => json.results)
      .then(members => this.setState({
        members,
        loading: false
      }))
  }

  makeAdmin(email) {
    const administrators = [
      ...this.state.administrators,
      email
    ]
    this.setState({ administrators: administrators })
    console.log(this.state)
  }

  removeAdmin(email) {
    const administrators = this.state.administrators.filter(e => e !== email)
    this.setState({ administrators: administrators })
  }

  render() {
    const { members, loading, administrators } = this.state
    return (
      <div className="member-list">
        <h1>Society Members</h1>
        {loading && <span>Loading...</span>}
        {members && members.length ?
          members.map((member, i) => <Member key={i}
            admin={administrators.some(a => a === member.email)}
            name={`${member.name.first} ${member.name.last}`}
            email={member.email}
            thumbnail={member.picture.thumbnail}
            makeAdmin={this.makeAdmin}
            removeAdmin={this.removeAdmin}
          />) :
          <span>Currently 0 members</span>
        }
      </div>
    )    
  }     
}

export default MemberList
