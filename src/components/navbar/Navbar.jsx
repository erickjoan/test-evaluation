import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../app/store/actions/authActions'

const mapState = (state) => ({
  currentUser: state.auth.currentUser,
})

const actions = {
  logout,
}

const Navbar = ({ currentUser, logout }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/">
          <Icon name="university" />
          Mitocode
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Resources">
            <Dropdown.Menu>
              <Dropdown.Item text="Students" icon="address card" as={Link} to="/students" />
              <Dropdown.Item text="Courses" icon="list ul" as={Link} to="/courses" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Dropdown pointing="top left" text="Invoice">
            <Dropdown.Menu>
              <Dropdown.Item text="New Registration" icon="file alternate" as={Link} to="/newRegistration" />
              <Dropdown.Item text="Registration List" icon="clipboard list" as={Link} to="/registrations" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item position="right">
          <Image avatar spaced="right" src="/assets/user.png" />
          <Dropdown pointing="top left" text={currentUser.sub}>
            <Dropdown.Menu>
              <Dropdown.Item text="Logout" icon="log out" onClick={logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(mapState, actions)(Navbar)

