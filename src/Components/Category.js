import React from 'react'
import Package from './Package'
import { Typography } from '@mui/material'

export default function Category({ data }) {
  return (
    <div>
      <Typography variant='h5' m={1}>{data.categoryName}</Typography>
      {data?.packages?.map((item, index) => {
        return (
          <Package item={item} key={index} />
        )

      })}
    </div>
  )
}
