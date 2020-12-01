import { toast } from 'react-toastify'
import * as actionTypes from './actionTypes'
import CourseService from '../../api/courseService'
import { closeModal } from './modalActions' 

const loadingCourses = (loading) => {
  return { type: actionTypes.LOADING_COURSES, payload: { loading } }
}

const loadingCourse = (loading) => {
  return { type: actionTypes.LOADING_COURSE, payload: { loading } }
}

const fecthCoursesAction = (courses) => {
  return { type: actionTypes.FETCH_COURSES, payload: { courses } }
}

const fetchCourseAction = (course) => {
  return { type: actionTypes.FETCH_COURSE, payload: { course } }
}

const addCourseAction = (courses) => {
  return { type: actionTypes.ADD_COURSE, payload: { courses } }
}

const updateCourseAction = (courses) => {
  return { type: actionTypes.UPDATE_COURSE, payload: { courses } }
}

const deleteCourseAction = (courses) => {
  return { type: actionTypes.DELETE_COURSE, payload: { courses } }
}

export const fetchCourses = () => async (dispatch) => {
  dispatch(loadingCourses(true))
  try {
    const courses = await CourseService.fetchCourses()

    dispatch(fecthCoursesAction(courses))
    dispatch(loadingCourses(false))
  } catch (error) {
    dispatch(loadingCourses(false))
    toast.error('Problem loading courses')
  }
}

export const fetchCourse = (id) => async (dispatch) => {
  dispatch(loadingCourse(true))
  try {
    const course = await CourseService.fetchCourse(id)

    dispatch(fetchCourseAction(course))
    dispatch(loadingCourse(false))
  } catch (error) {
    dispatch(loadingCourse(false))
    toast.error('Problem loading the selected course')
  }
}

export const addCourse = (course) => async (dispatch, getState) => {
  dispatch(loadingCourse(true))
  try {
    const newCourse = await CourseService.addCourse(course)
    const courses = [...getState().course.courses]
    courses.push(newCourse)

    // Actualizamos el estado global
    dispatch(addCourseAction(courses))
    dispatch(closeModal())
    dispatch(loadingCourse(false))
    toast.success('The course was added successfully')
  } catch (error) {
    dispatch(loadingCourse(false))
    toast.error('Problem adding the course')
  }
}

export const updateCourse = (course) => async (dispatch, getState) => {
  dispatch(loadingCourse(true))
  try {
    const updatedCourse = await CourseService.updateCourse(course)

    const courses = [...getState().course.courses]
    const index = courses.findIndex((a) => a.id === updatedCourse.id)
    courses[index] = updatedCourse

    dispatch(updateCourseAction(courses))

    dispatch(loadingCourse(false))
    dispatch(closeModal())
    toast.success('¡SE MODIFICO CORRECTAMENTE!')
  } catch (error) {
    dispatch(loadingCourse(false))
    toast.error('Problem updating the course')
  }
}

export const deleteCourse = (id) => async (dispatch, getState) => {
  dispatch(loadingCourse(true))
  try {
    await CourseService.deleteCourse(id)
    let courses = [...getState().course.courses]

    courses = courses.filter((a) => a.id !== id)

    dispatch(deleteCourseAction(courses))
    dispatch(loadingCourse(false))
    toast.info('The selected course was removed')
  } catch (error) {
    dispatch(loadingCourse(false))
    toast.error('Problem deleting the course')
  }
}
