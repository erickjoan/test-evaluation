import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react'

import StudentService from '../../app/api/studentService'
import CourseService from '../../app/api/courseService'
import RegistrationService from '../../app/api/registrationService'
import LoadingComponent from '../../components/common/LoadingComponent'

const RegistrationDetails = ({ match }) => {
    const [registration, setRegistration] = useState(null)
    const [loading, setLoading] = useState(false)
  
    const fetchRegistration = useCallback(async () => {
      setLoading(true)
      try {
        const registration = await RegistrationService.fetchRegistration(match.params.id)
        if (registration) {
          const student = await StudentService.fetchStudent(registration.estudiante.id)

          const listcurso = []
          if (registration.listcurso.length > 0) {
            registration.listcurso.forEach((listcur) => {
                CourseService.fetchCourse(listcur.curso.id)
                .then((response) => {
                  if (response) {
                    const courseItem = {
                     // quantity: item.cantidad,
                      name: response.nombre,
                      initials: response.sigla,
                     // price: response.precio,
                     // id: response.id,
                     // total: parseFloat(response.precio) * parseInt(item.cantidad, 0),
                    }
                    listcurso.push(courseItem)
                  }
                  

                  // const totalAmount = listcursos.reduce((sum, { total }) => sum + total, 0)
  
                  const registrationDetail = {
                    id: registration.id,
                    description: registration.descripcion,
                    // observation: registration.observacion,
                    student,
                    listcurso,
                    createdAt: new Date(registration.fecha_matricula).toLocaleDateString(),
                   // totalAmount,
                  }
                  

                  setRegistration(registrationDetail)
                })
                .catch((error) => toast.error(error))
                
            })
          }
      
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error(error)
      }
    }, [match.params.id])
  
    useEffect(() => {
        fetchRegistration()
    }, [fetchRegistration])

    if (loading) return <LoadingComponent content="Loading Registration Details..." />
    let registrationDetailedArea = <h4>Registration Details</h4>

    if (registration) {
      registrationDetailedArea = (
        <Segment.Group>
          <Segment>
            <Header as="h4" block color="violet">
              Students
            </Header>
          </Segment>
          <Segment.Group>
            <Segment>
              <p>
                <strong>Name: </strong>
                {`${registration.student.nombre} ${registration.student.apellido}`}
              </p>
            </Segment>
          </Segment.Group>
          <Segment>
            <Header as="h4" block color="violet">
              Registration
            </Header>
          </Segment>
          <Segment.Group>
            <Segment>
              <p>
                <strong>Registration Code: </strong>
                {registration.id}
              </p>
              <p>
                <strong>Description: </strong>
                {registration.description}
              </p>
              <p>
                <strong>Created At: </strong>
                {registration.createdAt}
              </p>
             
            </Segment>
          </Segment.Group>
          <Segment>
            <Table celled striped color="violet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Icon name="book" />
                    Courses
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>initials</Table.HeaderCell>

                </Table.Row>
              </Table.Header>
              <Table.Body>
                {registration.listcurso.length > 0 &&
                  registration.listcurso.map((listcurs) => (
                    <Table.Row key={listcurs.id}>
                      <Table.Cell>{listcurs.name}</Table.Cell>
                      <Table.Cell>{listcurs.initials}</Table.Cell>
                   
                      
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
 
          </Segment>
        </Segment.Group>
      )
    }
  
    return (
      <Segment>
        <Breadcrumb size="small">
          <Breadcrumb.Section>Invoice</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section as={Link} to="/registrations">
            Invoice List
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Invoice Detail</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="address card outline" />
            Invoice Detail
          </Header>
        </Divider>
        <Container>
          <Grid columns="3">
            <Grid.Column width="3" />
            <Grid.Column width="10">{registrationDetailedArea}</Grid.Column>
            <Grid.Column width="3" />
          </Grid>
        </Container>
      </Segment>
    )
  }
  
  RegistrationDetails.propTypes = {
    match: PropTypes.object.isRequired,
  }


export default RegistrationDetails
