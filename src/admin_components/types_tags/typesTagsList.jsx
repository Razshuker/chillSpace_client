import React from 'react'
import TagsTable from './tagsTable'
import TypesTable from './typesTable'
import Add from './add'
import { Link } from 'react-router-dom'

export default function TypesTagsList() {


    return (
        <div className="container-fluid">
            <div className="container">
                <Link to="add" className='btn btn-outline-dark mt-3'>Add new type / tag</Link>
                <TagsTable />
                <TypesTable />
            </div>
        </div>

    )
}
