import { useEffect, useState } from "react"

export const useScroll = () => {
    const [isEnd, setIsEnd] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", scrollWindow);
        return () => {
            // console.log("long page will unmount hook");
            window.removeEventListener("scroll", scrollWindow);
        }
    }, [])

    const scrollWindow = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const docHeight = document.documentElement.offsetHeight
        if (Math.ceil(windowHeight + scrollTop) >= docHeight) {
            setIsEnd(true)
        }
    }

    const setScrollEndFalse = () => {
        setIsEnd(false)
    }
    return { isEnd, setScrollEndFalse }
}