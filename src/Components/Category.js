import React from 'react'
import Package from './Package'

export default function Category({ data }) {
  console.log(data, 'data')
  return (
    <div>
      <h1>{data.categoryName}</h1>
      {data?.packages?.map((item) => {
        return (
          <Package item={item}/>
        )

      })}
    </div>
  )
}
