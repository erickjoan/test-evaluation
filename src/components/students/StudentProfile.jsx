import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import StudentHeader from './StudentHeader'
import PhotoUploadWidget from '../common/photoUpload/PhotoUploadWidget'
import StudentService from '../../app/api/studentService'
import useFetchStudent from '../../app/hooks/useFetchStudent'

const StudentProfile = ({ studentId }) => {
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [studentDetail, setStudentDetail] = useState(null)
  const [student] = useFetchStudent(studentId)

  useEffect(() => {
    setStudentDetail(student)
  }, [student])

  const handleUploadImage = async (photo) => {
    setUploadingPhoto(true)
    try {
      const updatedStudent = await StudentService.uploadStudentPhoto(studentId, photo)
      setUploadingPhoto(false)
      setStudentDetail(updatedStudent)
    } catch (error) {
      setUploadingPhoto(false)
      toast.error(error)
    }
  }

  return (
    <Grid>
      <Grid.Column width="16">
        {studentDetail && (
          <>
            <StudentHeader student={studentDetail} />
            <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

StudentProfile.propTypes = {
  studentId: PropTypes.string.isRequired,
}

export default StudentProfile
