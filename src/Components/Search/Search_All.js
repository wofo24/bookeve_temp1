import React from 'react'
import Search from './Search'
import { useSelector, useDispatch } from 'react-redux';
export default function Search_All() {
    const query = useSelector((state) => state?.search_item?.data)
    return (
        <div>
            <Search query={query} />
        </div>
    )
}
