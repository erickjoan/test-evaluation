import React, { useEffect, useState } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { openModal, closeModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import StudentForm from '../../components/students/StudentForm'
import StudentService from '../../app/api/studentService'
import StudentProfile from '../../components/students/StudentProfile'
import useFetchStudents from '../../app/hooks/useFetchStudents'

const actions = {
  openModal,
  closeModal,
}

const Students = ({ openModal, closeModal }) => {
  const [studentsList, setStudentsList] = useState([])
  const [loadingAction, setLoadingAction] = useState(false)
  const [loading, setLoading] = useState(true)

  const [students] = useFetchStudents()

  useEffect(() => {
    setLoading(true)
    if (students) {
      setStudentsList(students)
      setLoading(false)
    }
  }, [students])

  const handleCreateorEdit = async (values) => {
    const studentsUpdatedList = [...studentsList]
    try {
      if (values.id) {
        const updatedStudent = await StudentService.updateStudent(values)
        const index = studentsUpdatedList.findIndex((a) => a.id === values.id)
        studentsUpdatedList[index] = updatedStudent
        toast.success('The students selected was updated')
      } else {
        const student = {
          nombre: values.nombre,
          apellido: values.apellido,
          dni: values.dni,
          edad: values.edad,
          urlFoto: '',
        }
        const newStudent = await StudentService.addStudent(student)
        studentsUpdatedList.push(newStudent)
        toast.success('Added new student')
      }
      setStudentsList(studentsUpdatedList)
    } catch (error) {
      toast.error(error)
    }
    closeModal()
  }

  const handleDeleteCustomer = async (id) => {
    setLoadingAction(true)
    try {
      let studentsUpdatedList = [...studentsList]
      await StudentService.removeStudent(id)
      studentsUpdatedList = studentsUpdatedList.filter((a) => a.id !== id)
      setStudentsList(studentsUpdatedList)
      setLoadingAction(false)
      toast.success('The customer was deleted')
    } catch (error) {
      setLoadingAction(false)
      toast.error(error)
    }
  }

  let studentsArea = <h4>There are no students</h4>

  if (studentsList && studentsList.length > 0) {
    studentsArea = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="3">Name</Table.HeaderCell>
            <Table.HeaderCell width="3">LastName</Table.HeaderCell>
            <Table.HeaderCell width="2">Dni</Table.HeaderCell>
            <Table.HeaderCell width="1">Age</Table.HeaderCell>
            <Table.HeaderCell width="3" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {studentsList.map((student) => (
            <Table.Row key={student.id}>
              <Table.Cell>{student.nombre}</Table.Cell>
              <Table.Cell>{student.apellido}</Table.Cell>
              <Table.Cell>{student.dni}</Table.Cell>
              <Table.Cell>{student.edad}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Update Student"
                  trigger={
                    <Button
                      color="violet"
                      icon="edit"
                      loading={loadingAction}
                      onClick={() =>
                        openModal(<StudentForm studentId={student.id} submitHandler={handleCreateorEdit} />)}
                    />
                  }
                />
                <Popup
                  inverteds
                  content="Delete Customer"
                  trigger={
                    <Button
                      color="red"
                      icon="trash"
                      loading={loadingAction}
                      onClick={() => {
                        handleDeleteCustomer(student.id)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Upload Photo"
                  trigger={
                    <Button
                      color="vk"
                      icon="cloud upload"
                      loading={loadingAction}
                      onClick={() => {
                        openModal(<StudentProfile studentId={student.id} />, 'large', true)
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

  if (loading) return <LoadingComponent content="Loading Students...." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Resources</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Students</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Students List
        </Header>
      </Divider>
      <Segment>
        <Button
          size="large"
          content="New Students"
          icon="add user"
          color="purple"
          onClick={() => {
            openModal(<StudentForm submitHandler={handleCreateorEdit} />)
          }}
        />
      </Segment>
      <Container textAlign="center">
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{studentsArea}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

Students.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(null, actions)(Students)
