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
//                 <div>
//                     {places.length == 0 ? <h2 className='noPlaces'>There aren't match places to the search : "{query.get("s")}"</h2> :

//                         places.map(item => {
//                             return (
//                                 <PlaceItem key={item._id} item={item} />
//                             )
//                         })
//                     }
//                     <UpButton />
//                 </div>
//             }
//         </div>
//     )
// }



// import React, { useEffect, useState } from 'react'
// import '../../css/places.css'
// import PlaceItem from './placeItem'
// import { API_URL, doApiGet } from '../../services/apiService'
// import { useSearchParams } from 'react-router-dom';
// import UpButton from '../upButton';
// import Loading from '../loading';
// import InfiniteScroll from 'react-infinite-scroll-component';


// export default function PlacesList({ page, setPage }) {
//     const [places, setPlaces] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [query] = useSearchParams();
//     const [noMorePlaces, setNoMorePlaces] = useState(false);
//     let state = {
//         items: Array.from({ length: 5 })
//     };
//     const [test, setTest] = useState((Array.from({ length: 2 })))

//     useEffect(() => {
//         getPlaces();
//     }, [query]);

//     const getPlaces = async () => {
//         try {
//             setIsLoading(true);
//             let url = query.get("s") ? API_URL + `/places?perPage=0&s=` + query.get("s") : API_URL + `/places?perPage=0`;
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
//             if (data.length === 0) {
//                 setNoMorePlaces(true);
//             } else {
//                 setPage(page => page + 1);
//                 setPlaces((places) => page == 1 ? data : [...places, ...data]);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     }
//     const fatchPlaces = () => {
//         // Simulating a fake async API call that sends
//         // 20 more records in 1.5 seconds
//         setTimeout(() => {
//             setTest(prevItems => prevItems.concat(Array.from({ length: 3 })));
//         }, 1500);
//     };

//     return (
//         <div className="placeList container">
//             {isLoading && <Loading />}
//             <InfiniteScroll
//                 dataLength={test.length}
//                 next={fatchPlaces}
//                 // hasMore={!noMorePlaces && !isLoading}
//                 hasMore={true}
//                 loader={<Loading />}
//                 children
//             >
//                 {places.length === 0 && !isLoading ? (
//                     <h2 className='noPlaces'>
//                         There aren't match places to the search : "{query.get("s")}"
//                     </h2>
//                 ) : (
//                     places.map(item => (
//                         <PlaceItem key={item._id} item={item} setPage={setPage} />
//                     ))
//                 )}
//                 <UpButton />
//             </InfiniteScroll>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import '../../css/places.css';
import PlaceItem from './placeItem';
import { API_URL, doApiGet } from '../../services/apiService';
import { useSearchParams } from 'react-router-dom';
import UpButton from '../upButton';
import Loading from '../loading';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function PlacesList({ page, setPage }) {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query] = useSearchParams();
    const [noMorePlaces, setNoMorePlaces] = useState(false);
    const [displayLimit, setDisplayLimit] = useState(6); // Set the initial limit here

    useEffect(() => {
        getPlaces();
    }, [query]);

    const getPlaces = async () => {
        try {
            setIsLoading(true);
            let url = query.get("s") ? API_URL + `/places?perPage=0&s=` + query.get("s") : API_URL + `/places?perPage=0`;
            if (query.get("area")) {
                url += `&area=` + query.get("area");
            }
            if (query.get("tags")) {
                url += `&tags=` + query.get("tags");
            }
            if (query.get("types")) {
                url += `&types=` + query.get("types");
            }
            if (query.get("cats")) {
                url += `&cats=` + query.get("cats");
            }
            const data = await doApiGet(url);
            if (data.length === 0) {
                setNoMorePlaces(true);
            } else {
                setPage(page => page + 1);
                setPlaces((places) => (page === 1 ? data : [...places, ...data]));
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const fetchPlaces = () => {
        // Simulating a fake async API call that sends
        // 20 more records in 1.5 seconds
        setTimeout(() => {
            setDisplayLimit(prevLimit => prevLimit + 6); // Adjust the increment as needed
        }, 1500);
    };

    const displayedPlaces = places.slice(0, displayLimit); // Limit the displayed places

    return (
        <div className="placeList container">
            {isLoading && <Loading />}
            <InfiniteScroll
                dataLength={displayedPlaces.length}
                next={fetchPlaces}
                hasMore={!noMorePlaces && !isLoading}
                loader={<Loading />}
                children
            >
                {displayedPlaces.length === 0 && !isLoading ? (
                    <h2 className="noPlaces">
                        There aren't match places to the search : "{query.get("s")}"
                    </h2>
                ) : (
                    displayedPlaces.map((item) => (
                        <PlaceItem key={item._id} item={item} setPage={setPage} />
                    ))
                )}
                <UpButton />
            </InfiniteScroll>
        </div>
    );
}
