import React, { useRef } from 'react'
import { FaSistrix } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BiSlider, BiX } from "react-icons/bi";



export default function SearchForm({ setShowSort, isShowSort, setPage }) {
    const inputRef = useRef();
    const nav = useNavigate();

    const onSearch = () => {
        nav("?s=" + inputRef.current.value);
        setPage(1);
    }

    const onEnterSearch = (e) => {
        if (e.key == "Enter") {
            onSearch();
        }
    }

    return (
        <div className='container-fluid'>
            <div className="container mt-5">
                <div className="row align-items-center justify-content-between w-100">
                    {isShowSort ?
                        <BiX onClick={() => {
                            setShowSort(!isShowSort);
                        }} className='h2 col-2 sort_icon' />
                        :
                        <BiSlider onClick={() => {
                            setShowSort(!isShowSort);
                        }} className='h2 col-2 sort_icon' />
                    }
                    <div className='d-flex align-items-center col-9'>
                        <input onKeyDown={onEnterSearch} ref={inputRef} placeholder='search for place...' type="text" className='input_search me-2 col-10' />
                        <button onClick={onSearch} className='btn_search col-auto'><FaSistrix className='search_icon' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
