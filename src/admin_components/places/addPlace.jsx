import React from 'react'
import {useForm} from "react-hook-form"

export default function AddPlace() {
    const { register, setValue ,getValues, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className='container'>
            <h1>Add new place</h1>
            <form id="id_form" >
                <label>name</label>
                <input id="id_name" class="form-control" type="text" />
                <label>img_url</label>
                <input id="id_img_url" class="form-control" type="text" />
                <label>type</label>
                <input id="id_type" class="form-control" type="text" />
                <label>categories_code</label>
                <input id="id_categories_code" class="form-control" type="text" />
                <label>city</label>
                <input id="id_city" class="form-control" type="text" />
                <label>phone</label>
                <input id="id_phone" class="form-control" type="tel" />
                <label>location</label>
                <input id="id_location" class="form-control" type="text" />
                <label>description</label>
                <input id="id_description" class="form-control" type="text" />
                <label>open_hours</label>
                <input id="id_open_hours" class="form-control" type="text" />
                <label>area</label>
                <input id="id_area" class="form-control" type="text" />
                <label>tags_id</label>
                <input id="id_tags_id" class="form-control" type="text" />
                <button>submit</button>
            </form>
        </div>
    )
}
