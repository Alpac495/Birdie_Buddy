import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";

function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={
                    <div className="error404">

                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;