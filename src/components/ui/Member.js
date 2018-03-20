import FaShield from 'react-icons/lib/fa/shield' 
import { Component, PropTypes } from 'react'

export class Member extends Component {
  componentWillMount() {
    this.style = {
      backgroundColor: 'LightSkyBlue'
    }
  }

  componentWillUpdate(nextProps) {
    this.style = {
      backgroundColor: nextProps.admin ? 'LightGreen' : 'DarkSeaGreen'
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.admin !== nextProps.admin
  }

render() {
  const { admin, name, email, thumbnail, makeAdmin, removeAdmin } = this.props;
    return (
      <div className="member" style={this.style}>
        <h1>{name} {!!admin} {admin && <FaShield />}</h1>
        {admin ? <a onClick={() => removeAdmin(email)}>Remove Admin</a> : <a onClick={() => makeAdmin(email)}>Make Admin</a>}
        <img src={thumbnail} alt="profile picture" />
        <p><a href={`mailto:${email}`}>{email}</a></p>
      </div>
    )
  }
}

Member.propTypes = {
  admin: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  thumbnail: PropTypes.string,
  makeAdmin: PropTypes.func
}

export default Member
