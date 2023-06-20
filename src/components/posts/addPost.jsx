import React from 'react'
import { useForm } from 'react-hook-form';

export default function AddPost() {
  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = () => {
    try {

    } catch (error) {
      console.log(error);
      alert("there is a problem, try again later")
    }
  }

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit(onSubForm)} >
        <label className="pt-3 pb-1">title</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter a valid name</div>}

        {/* <label className="pt-3 pb-1">image (url)</label>
                <input {...register("img_url", { minLength: 2 })} className="form-control" type="text" />
                {errors.img_url && <div className="text-danger">* Enter a valid url</div>} */}

        <label className="pt-3 pb-1">description</label>
        <input {...register("description", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.description && <div className="text-danger">* Enter a valid description</div>}

        <button className='btn btn-success m-4'> Submit </button>
      </form>
    </div>

  )
}
