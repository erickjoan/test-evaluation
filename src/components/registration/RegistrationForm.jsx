import React, { useEffect, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { Button, Form, Grid, Header, Popup, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import history from '../..'
import ErrorMessage from '../form/ErrorMessage'
import TextAreaInput from '../form/TextAreaInput'
import SelectedInput from '../form/SelectedInput'

import { fetchCourses } from '../../app/store/actions/courseActions'
import RegistrationService from '../../app/api/registrationService'
import useFetchStudents from '../../app/hooks/useFetchStudents'

const validate = combineValidators({
  descripcion: isRequired({ message: 'The description is required' }),
  estudiante: isRequired(''),
  curso: isRequired(''),
})

const actions = {
  fetchCourses,
}

const mapState = (state) => {
  const courses = []

  if (state.course.courses && state.course.courses.length > 0) {
    state.course.courses.forEach((listcur) => {
      const course = {
        key: listcur.id,
        text: listcur.nombre,
        value: listcur.id,
      }
      courses.push(course)
    })
  }

  return {
    loading: state.course.loadingCourses,
    courses,
  }
}

const RegistrationForm = ({ fetchCourses, courses, loading }) => {
  const [students] = useFetchStudents()
  const [studentsList, setStudentsList] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [listcurso, setListcurso] = useState([])
  const [listcur, setListcur] = useState(null)
  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses()
    }
    setLoadingStudents(true)
    if (students) {
      const studentsList = []
      students.forEach((listcur) => {
        const student = {
          key: listcur.id,
          text: `${listcur.nombre} ${listcur.apellido}`,
          value: listcur.id,
        }
        studentsList.push(student)
      })
      setStudentsList(studentsList)
      setLoadingStudents(false)
    }
  }, [students, courses.length, fetchCourses])

  const handleAddingListcurso = () => {
    const newListcurso = [...listcurso]
    const coursesList = [...courses]
    const index = newListcurso.findIndex((a) => a.id === listcur)
    if (index > -1) {
      newListcurso[index] = {
        id: newListcurso[index].id,
        name: newListcurso[index].name,
      }
      setListcurso(newListcurso)
    } else {
      const newListcur = {
        id: listcur,
        name: coursesList.filter((a) => a.key === listcur)[0].text,
      }
      newListcurso.push(newListcur)
    }
    setListcurso(newListcurso)
  }

  const handleRemoveListcurso = (id) => {
    let updatedListcurso = [...listcurso]
    updatedListcurso = updatedListcurso.filter((a) => a.id !== id)
    setListcurso(updatedListcurso)
  }

  const handleAddNewRegistration = async (values) => {
    const newListcurso = [...listcurso]
    const listcursoForRegistration = newListcurso.map((listcur) => {
      return { curso: { id: listcur.id } }
    })

    const newRegistration = {
      descripcion: values.descripcion,
      estado: true,
      estudiante: {
        id: values.estudiante,
      },
      listcurso: listcursoForRegistration,
    }
    try {

      const registration = await RegistrationService.createRegistration(newRegistration)
      toast.info('The registration was sucessfully created')
      history.push(`registration/${registration.id}`)
    } catch (error) {
      toast.error(error)
    }
    
  }

  return (
    <FinalForm
      onSubmit={(values) => handleAddNewRegistration(values)}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading || loadingStudents}>
          <Header as="h2" content="Add New Registration" color="pink" textAlign="center" />
          <Field name="descripcion" component={TextAreaInput} placeholder="Type some Description" />
          <Field
            name="estudiante"
            component={SelectedInput}
            placeholder="Select a Student"
            options={studentsList}
            width="4"
          />
          <Grid columns="2">
            <Grid.Row columns="2">
              <Grid.Column width="6">
                <Field
                  name="curso"
                  component={SelectedInput}
                  placeholder="Select a Course"
                  options={courses}
                  width="4"
                  handleOnChange={(e) => setListcur(e)}
                />
              </Grid.Column>
              <Grid.Column>
                <Popup
                  inverted
                  content="Add Course To Registration"
                  trigger={
                    <Button
                      type="button"
                      loading={submitting}
                      color="violet"
                      icon="plus circle"
                      onClick={handleAddingListcurso}
                      disabled={!listcur}
                    />
                  }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {listcurso && listcurso.length > 0 && (
                <Table celled collapsing style={{ marginLeft: '2%' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Course</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listcurso.map((listcur) => (
                      <Table.Row key={listcur.id}>
                        <Table.Cell>{listcur.name}</Table.Cell>
                        <Table.Cell>
                          <Popup
                            inverted
                            content="Remove from Registration"
                            trigger={
                              <Button
                                color="red"
                                icon="remove circle"
                                type="button"
                                onClick={() => handleRemoveListcurso(listcur.id)}
                              />
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Grid.Row>
          </Grid>
          <br />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid Values" />}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine || listcurso.length === 0}
            loading={submitting}
            color="violet"
            content="Add New Registration"
          />
        </Form>
      )}
    />
  )
}

RegistrationForm.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapState, actions)(RegistrationForm)
