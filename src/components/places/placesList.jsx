// import React, { useEffect, useState } from 'react'
// import '../../css/places.css'
// import PlaceItem from './placeItem'
// import { API_URL, doApiGet } from '../../services/apiService'
// import { useScroll } from '../../hooks/useScroll';
// import { useSearchParams } from 'react-router-dom';
// import UpButton from '../upButton';
// import Loading from '../loading';

// export default function PlacesList({ page, setPage }) {
//     const [places, setPlaces] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const { isEnd, setScrollEndFalse } = useScroll();
//     const [query] = useSearchParams();

//     useEffect(() => {
//         if (isEnd) {
//             setPage((page) => page + 1)
//             getPlaces();
//         }
//     }, [isEnd]);

//     useEffect(() => {
//         getPlaces();
//     }, [query]);


//     const getPlaces = async () => {
//         try {
//             setIsLoading(true);
//             let url = query.get("s") ? API_URL + `/places?page=${page}&s=` + query.get("s") : API_URL + `/places?page=${page}`;
//             if (query.get("area")) {
//                 url += `&area=` + query.get("area");
//             }
//             if (query.get("tags")) {
//                 url += `&tags=` + query.get("tags")
//             }
//             if (query.get("types")) {
//                 url += `&types=` + query.get("types")
//             }
//             if (query.get("cats")) {
//                 url += `&cats=` + query.get("cats")
//             }
//             const data = await doApiGet(url);
//             setPlaces((places) => (page == 1 ? data : [...places, ...data]));
//             setScrollEndFalse();
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="placeList container">
//             {isLoading ? <Loading /> :
//                 <>
//                     {places.length == 0 ? <h2 className='noPlaces'>There aren't match places to the search : "{query.get("s")}"</h2> :

//                         places.map(item => {
//                             return (
//                                 <PlaceItem key={item._id} item={item} />
//                             )
//                         })
//                     }
//                     <UpButton />
//                 </>
//             }
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react'
import '../../css/places.css'
import PlaceItem from './placeItem'
import { API_URL, doApiGet } from '../../services/apiService'
import { useSearchParams } from 'react-router-dom';
import UpButton from '../upButton';
import Loading from '../loading';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function PlacesList({ page, setPage }) {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query] = useSearchParams();
    const [noMorePlaces, setNoMorePlaces] = useState(false);


    useEffect(() => {
        getPlaces();
    }, [query]);

    const getPlaces = async () => {
        try {
            setIsLoading(true);
            let url = query.get("s") ? API_URL + `/places?page=${page}&s=` + query.get("s") : API_URL + `/places?page=${page}`;
            if (query.get("area")) {
                url += `&area=` + query.get("area");
            }
            if (query.get("tags")) {
                url += `&tags=` + query.get("tags")
            }
            if (query.get("types")) {
                url += `&types=` + query.get("types")
            }
            if (query.get("cats")) {
                url += `&cats=` + query.get("cats")
            }
            const data = await doApiGet(url);
            if (data.length === 0) {
                setNoMorePlaces(true);
            } else {
                setPage(page => page + 1);
                setPlaces((places) => page == 1 ? data : [...places, ...data]);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }


    return (
        <div className="placeList container">
            <InfiniteScroll
                dataLength={places.length}
                next={() => {
                    getPlaces();
                }}
                hasMore={!noMorePlaces && !isLoading}
                loader={<Loading />}
            >
                {places.length === 0 ? (
                    <h2 className='noPlaces'>
                        There aren't match places to the search : "{query.get("s")}"
                    </h2>
                ) : (
                    places.map(item => (
                        <PlaceItem key={item._id} item={item} setPage={setPage} />
                    ))
                )}
                <UpButton />
            </InfiniteScroll>
        </div>
    );
}
