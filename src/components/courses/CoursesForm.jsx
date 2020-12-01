import React, { useEffect, useState } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, composeValidators, isRequired } from 'revalidate'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import { fetchCourse, addCourse, updateCourse } from '../../app/store/actions/courseActions'
import ErrorMessage from '../form/ErrorMessage'

const validate = combineValidators({
  nombre: isRequired({ message: 'Please type a name' }),
  sigla: isRequired({ message: 'Please type a name' }),
  // precio: composeValidators(isRequired({ message: 'The price is required' }))(),
})

const actions = {
  fetchCourse,
  addCourse,
  updateCourse,
}

const mapState = (state) => ({
  course: state.course.course,
  loading: state.course.loadingCourse,
})

const CoursesForm = ({ id, course, fetchCourse, loading, addCourse, updateCourse }) => {
  const [actionLabel, setActionLabel] = useState('Add Course')

  useEffect(() => {
    if (id) {
      fetchCourse(id)
      setActionLabel('Edit & Course')
    } else setActionLabel('Add Course')
  }, [fetchCourse, id])

  const handleCreateorEdit = (values) => {
    if (id) {
      updateCourse(values)
    } else {
      const newCourse = {
        nombre: values.nombre,
        sigla: values.sigla,
        estado: true,
      }
      addCourse(newCourse)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleCreateorEdit(values)}
      initialValues={id && course}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h2" content={actionLabel} color="pink" textAlign="center" />
          <Field name="nombre" component={TextInput} placeholder="Type the dish name" />
          <Field name="sigla" component={TextInput} placeholder="Type the sigla name" />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid values" />}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="violet"
            content={actionLabel}
          />
        </Form>
      )}
    />
  )
}

CoursesForm.propTypes = {
  id: PropTypes.string,
  course: PropTypes.object,
  fetchCourse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  addCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
}

CoursesForm.defaultProps = {
  id: null,
  course: null,
}

export default connect(mapState, actions)(CoursesForm)
