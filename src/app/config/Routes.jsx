import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import NotFound from '../../components/common/NotFound'
import Navbar from '../../components/navbar/Navbar'
import Students from '../../pages/student/Students'
import Courses from '../../pages/course/Courses'
import HomePage from '../../pages/home/HomePage'
import Registration from '../../pages/registration/Registration'
import Registrations from '../../pages/registration/Registrations'
import RegistrationDetails from '../../pages/registration/RegistrationDetails'

const Routes = ({ authenticated }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      {authenticated && (
        <Route
          path="/(.+)"
          render={() => (
            <>
              <Navbar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/students" component={Students} />
                  <Route path="/Courses" component={Courses} />
                  <Route path="/newRegistration" component={Registration} />
                  <Route path="/registration/:id" component={RegistrationDetails} />
                  <Route path="/registrations" component={Registrations} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      )}
    </>
  )
}

Routes.propTypes = {
  authenticated: PropTypes.bool,
}

Routes.defaultProps = {
  authenticated: false,
}
export default withRouter(Routes)
