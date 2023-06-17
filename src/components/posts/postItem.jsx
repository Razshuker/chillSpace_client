import React from 'react'
import "../../css/posts.css"
import { Link } from 'react-router-dom'
import { AiFillLike, AiOutlinePushpin } from "react-icons/ai";


export default function PostItem(props) {
    const item = props.item;

    const getTimePassed = (date) => {
        const now = new Date().getTime();
        const pastDate = new Date(date).getTime();
        const timeDiff = now - pastDate;
      

        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if(days >= 1){
        return `${days}d ago`
      }
        return `${days}d ${hours}h ago`;
      }
    
    return (

        <div className='postItem border p-4  mt-4 row '>
            <div className=' border-end border-4 col-md-7 '>
                <div className='row align-items-center justify-content-between'>
                <div className='col-6'>
                <div className='row p-2'>
                    <div className='col-auto profile-pic bg-light'>
                        profile pic
                    </div>
                 
                        <div className='col-3'>nickNme</div>
                        <h5 className='p-1'>{item.title}</h5>
                </div>
                </div>

                <div className='col-auto mx-3'>
                <div className=' col-auto '>{getTimePassed(item.date_created)}</div>
                <div className='col-auto p-1'> <AiOutlinePushpin className='h5'/>location</div>
                </div>

                </div>

                <div className='row'>
                    <div className='bg-dark m-1 col-md-5 postPic'>picture</div>
                    <div className='col-md-6'>{item.description}</div>
                </div>
                <div className='float-end'>
                <AiFillLike className=' h3'/>
                    <span className='p-1'>{item.likes}</span>
                </div>
            </div>

            <div className='col-md-5 text-center'>
                <h5 className='text-center'>comments</h5>
                <div className='row border m-1'>
                <div className='col-2  profile-pic-comment bg-light'>
                    pic
                </div>
                <div className='col-9 d-flex align-items-center'>
                    your comment
                </div>
                </div>
                <div className='row border m-1'>
                <div className='col-2  profile-pic-comment bg-light'>
                    pic
                </div>
                <div className='col-9 d-flex align-items-center'>
                    your comment
                </div>
                </div>
                <div className='row border m-1'>
                <div className='col-2  profile-pic-comment bg-light'>
                    pic
                </div>
                <div className='col-9 d-flex align-items-center'>
                    your comment
                </div>
                </div>

                <div className='p-2'>
                <Link to={"#"}>more comments</Link>
                <br/>
                <button className='btn btn-light mt-4'>Write your comment...</button>
                </div>
            </div>

        </div>


    )
}
