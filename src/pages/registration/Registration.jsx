import React from 'react'

import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import RegistrationForm from '../../components/registration/RegistrationForm'

const Registration = () => {
  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Registration</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/registrations">
          Registration List
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>New Registration</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Registration Detail
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">
            <RegistrationForm />
          </Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

export default Registration
