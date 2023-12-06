import React from 'react'
import Package from './Package'
import { Box, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
export default function Category({ data }) {
  const buttonStyles = useSelector((state) => state.apply_new_theme)

  return (
    <Box>
      <Typography variant='h5' sx={{color:buttonStyles.color, fontFamily:buttonStyles.fontFamily}}>{data.category}</Typography>
      {data?.packages?.map((item, index) => {
        return (
          <Package item={item} key={index} />
        )

      })}
    </Box>
  )
}
