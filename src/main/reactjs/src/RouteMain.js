import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import {Login, Sign} from "./login";

function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>


                <Route path={'/friend'} >

                </Route>

                <Route path={'/hugi'} >

                </Route>

                <Route path={'/joining'} >

                </Route>

                <Route path={'/login'} >
                    <Route path="login" element={<Login/>}/>
                    <Route path="sign" element={<Sign/>}/>
                </Route>

                <Route path={'/mypage'} >

                </Route>

                <Route path={'/score'} >

                </Route>

                <Route path="*" element={
                    <div className="error404">
                        잘못된주소
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;