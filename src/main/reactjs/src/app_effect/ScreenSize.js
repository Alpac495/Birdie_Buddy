import React, {useEffect} from 'react';


function ScreenSize(props) {
    const setScreenSize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    useEffect(() => {
        setScreenSize();
    },[]);
    return (
        <div></div>
    );
}

export default ScreenSize;