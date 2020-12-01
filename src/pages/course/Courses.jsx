import React, { useEffect } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCourses, deleteCourse } from '../../app/store/actions/courseActions'
import { openModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import CoursesForm from '../../components/courses/CoursesForm'

const actions = {
  fetchCourses,
  openModal,
  deleteCourse,
}

const mapState = (state) => ({
  courses: state.course.courses,
  loading: state.course.loadingCourses,
  loadingCourse: state.course.loadingCourse,
})

const Courses = ({ fetchCourses, courses, openModal, loading, loadingCourse, deleteCourse }) => {
  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  let courseList = <h4>There are no courses on the store</h4>

  if (courses && courses.length > 0) {
    courseList = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5">nombre</Table.HeaderCell>
            <Table.HeaderCell width="2">sigla</Table.HeaderCell>
            <Table.HeaderCell width="2" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {courses.map((course) => (
            <Table.Row key={course.id}>
              <Table.Cell>{course.nombre}</Table.Cell>
              <Table.Cell>{course.sigla}</Table.Cell>
              <Table.Cell>
                <Popup
                  inverted
                  content="Update course"
                  trigger={
                    <Button
                      basic
                      color="violet"
                      icon="edit"
                      loading={loadingCourse}
                      onClick={() => {
                         openModal(<CoursesForm id={course.id} />)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="Delete course"
                  trigger={
                    <Button
                      basic
                      color="red"
                      icon="trash"
                      loading={loadingCourse}
                      onClick={() => {
                        deleteCourse(course.id)
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

  if (loading) return <LoadingComponent content="Loading Course..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Resources</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Courses</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Course List
        </Header>
      </Divider>
      <Segment>
        <Button
          size="large"
          content="New Course"
          icon="add"
          color="purple"
          onClick={() => {
             openModal(<CoursesForm />)
          }}
        />
      </Segment>
      <Container>
        <Grid.Column columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{courseList}</Grid.Column>
          <Grid.Column width="3" />
        </Grid.Column>
      </Container>
    </Segment>
  )
}

Courses.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingCourse: PropTypes.bool.isRequired,
  deleteCourse: PropTypes.func.isRequired,
}

export default connect(mapState, actions)(Courses)
