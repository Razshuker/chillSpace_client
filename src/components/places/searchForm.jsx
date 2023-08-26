import React, { useRef } from 'react'
import { FaSistrix } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiSliderAlt, BiX } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai"
import '../../css/places.css'
import { Dropdown } from 'react-bootstrap';

export default function SearchForm({ setShowSort, isShowSort }) {
    const inputRef = useRef();
    const nav = useNavigate();
    const [query] = useSearchParams();

    const onSearch = () => {
        const searchParams = new URLSearchParams(query);
        searchParams.set("s", inputRef.current.value);
        nav("?" + searchParams.toString());
    }

    const onEnterSearch = (e) => {
        if (e.key == "Enter") {
            onSearch();
        }
    }

    const onCleanSearch = () => {
        nav("/places");
        // need to reload again to delete the default checked tags
        window.location.reload(false);
    }

    const onClickSort = () => {
        setShowSort(!isShowSort);
    }

    return (
        <div className='container-fluid'>
            <div className="container mt-5">
                <div className="row align-items-center justify-content-between w-100">
                    <div className='d-flex align-items-center col-3 p-0'>
                        {isShowSort ?
                            <div className='h1 ps-2-1 col-2 sort_icon me-4'>
                                <BiX onClick={onClickSort} />
                            </div>
                            :
                            <BiSliderAlt onClick={onClickSort} className='h2 col-2 sort_icon m-0' />}
                        {query.get("s") &&
                            <Dropdown className='place_clear'>
                                <Dropdown.Toggle variant="" className='cleanBtn col-auto' id="dropdown-basic">

                                    <AiOutlineDelete />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={onCleanSearch}>clear search</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </div>
                    <div className='d-flex align-items-center col-9'>
                        <input onKeyDown={onEnterSearch} ref={inputRef} placeholder='search for a place...' type="text" className='input_search me-2 col-11' />
                        <button onClick={onSearch} className='btn_search col-auto'><FaSistrix className='search_icon' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
