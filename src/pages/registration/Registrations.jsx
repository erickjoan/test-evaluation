import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import RegistrationService from '../../app/api/registrationService'
import LoadingComponent from '../../components/common/LoadingComponent'

const Registrations = ({ history }) => {
    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(false)
  
    const fetchRegistrations = useCallback(async () => {
      setLoading(true)
      try {
        const registrations = await RegistrationService.fetchRegistrations()
        if (registrations) setRegistrations(registrations)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error(error)
      }
    }, [])
  
    useEffect(() => {
        fetchRegistrations()
    }, [fetchRegistrations])
  
    let registrationsList = <h4>There is no registered registrations</h4>
  
    if (registrations && registrations.length > 0) {
      registrationsList = (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="5">Description</Table.HeaderCell>
              <Table.HeaderCell width="2">Registered On</Table.HeaderCell>
              <Table.HeaderCell width="3" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {registrations.map((registration) => (
              <Table.Row key={registration.id}>
                <Table.Cell>{registration.descripcion}</Table.Cell>
                <Table.Cell>{new Date(registration.fecha_matricula).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Popup
                    inverted
                    content="Registration Detail"
                    trigger={
                      <Button
                        color="violet"
                        icon="address card outline"
                        onClick={() => {
                          history.push(`/registration/${registration.id}`)
                        }}
                      />
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
  
    if (loading) return <LoadingComponent content="Loading Registration..." />
  
    return (
      <Segment>
        <Breadcrumb size="small">
          <Breadcrumb.Section>Invoice</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Registration List</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="list alternate outline" />
            Invoices
          </Header>
        </Divider>
        <Container>
          <Grid columns="3">
            <Grid.Column width="3" />
            <Grid.Column width="10">{registrationsList}</Grid.Column>
            <Grid.Column width="3" />
          </Grid>
        </Container>
      </Segment>
    )
  }
  
  Registrations.propTypes = {
    history: PropTypes.object.isRequired,
  }

export default Registrations
