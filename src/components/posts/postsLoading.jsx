import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AiFillLike, AiOutlinePushpin,AiFillMessage, AiOutlineHeart } from "react-icons/ai";


export default function PostsLoading() {
  return (
    <div className='postItem border p-3  mt-4 row mb-5 pb-5'>
    <div className='postInfo col-md-7 '>
        <div className='row align-items-center justify-content-between pb-4'>
            <div className='col-9'>
                <div className='row'>
                    <div className='col-2 profile-pic p-0'>
                        <AccountCircle className='profile_icon' fontSize='large' />
                    </div>
                    <div className='col-9 ms-3'>
                        <h5><p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p></h5>
                        <h4 className='col-auto'><p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p></h4>
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className=' col-auto '><p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                </p></div>
                <div className='col-auto p-1'> 
                <AiOutlinePushpin className='h5' />
                <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                </p></div>
            </div>
        </div>

        <div className='row'>
            <div className='col-md-6'><p className="placeholder-glow">
                <span className="placeholder col-12"></span>
            </p></div>
        </div>
        <div className='float-end'>
            <button className='btnIcon'><AiOutlineHeart className='h2 m-0 ' /></button>
            <span className='p-1'><p className="placeholder-glow">
                <span className="placeholder col-12"></span>
            </p></span>
        </div>
    </div>

    <div className='col-md-5 text-center'>
        <h5 className='text-center'><p className="placeholder-glow">
            <span className="placeholder col-12"></span>
        </p></h5>

        <div className='p-2'>
            <button className='btn btn-link '><p className="placeholder-glow">
                <span className="placeholder col-12"></span>
            </p></button>
            <br />
            <div className='row col-auto pt-4 align-items-center'>
                <div className='col-10 '>
                    <textarea className=' postInputs input-group m-auto text-center'  />
                </div>
                <button className=' col-2 btnIcon'>
                    <AiFillMessage  className='display-4' />
                </button>
            </div>
        </div>
    </div>

</div>  )
}
