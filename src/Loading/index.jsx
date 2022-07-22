import { useSelector } from 'react-redux'
import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const Loading = () => {
  const loading = useSelector(state => state.app.loading)
  if (loading > 0) {
    return (
      <LinearProgress
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0
        }}
        color="secondary"
      />
    )
  }
  return null
}
export default Loading
