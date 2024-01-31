import React from 'react'
import Package from './Package'
import { Box, Typography } from '@mui/material'
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
export default function Category({ data }) {
  const styles = useSelector((state) => state.all_theme)
  const text = useSelector((state) => state.text)

  return (
    <Box>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >
        {(matches) => (
          <>
            {matches.large && (
              <Typography fontSize={'27px'} my={1} sx={{ color: "black", fontFamily: styles?.typography?.fontFamily }}>{data.category}</Typography>
            )}
            {matches.small && (
              <Typography variant='h5' sx={{ color: styles?.colors?.heighlightText, fontFamily: styles?.typography?.fontFamily }}>{data.category}</Typography>
            )}
          </>)}
      </Media>
      {data?.packages?.map((item, index) => {

        return (
          <Package item={item} key={index} />
        )

      })}
    </Box>
  )
}
