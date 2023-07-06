import React, {useEffect, useState} from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
function HugiRowList(props) {
    const {uname, hcontent, hphoto,hwriteday,hlike} = props;
    const url = process.env.REACT_APP_BOARDURL;

    const navi=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
    const [unum, setUnum] = useState(null); // unum 상태 추가
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        // 세션에 unum 정보가 있는지 확인하는 로직
        const unum = sessionStorage.getItem('unum');
        setUnum(unum);
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        // unum이 존재하면 로그인 상태로 간주
        if (unum) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={uname}
                        src="/static/images/avatar/1.jpg"
                        />
                <h5>{uname}</h5>
            </div>
            &nbsp;
            <span style={{marginLeft:"10px",color:"gray"}}>{hwriteday}</span>

            <img className="list_image" src={`${url}${hphoto}`} alt=""  value={hphoto}/>
            {/*<img className="list_image" src={process.env.PUBLIC_URL +`${hphoto}`} alt="" />*/}
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div style={{width:"100%",marginBottom:"10px",marginLeft:"10px"}}>
                <MessageIcon onClick={handleClickOpen} style={{cursor:"pointer"}}/>
            </div>

            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{width:"100%",height:"600px",overflowX:"hidden"}}>
                <DialogTitle id="alert-dialog-title" >
                    <Avatar className="list_avatar" alt={uname}
                            src="/static/images/avatar/1.jpg"
                            style={{width:"35px",height:"35px"}}
                    />
                    <b style={{position:"relative",bottom:"35px",left:"50px",fontSize:"18px" }}>{uname}</b>
                </DialogTitle>
                <DialogContent style={{width:"100%",overflowX:"hidden"}}>
                            <img className="list_image"  src={`${url}${hphoto}`} alt="" style={{width:"100%"}} value={hphoto}/>
                    <DialogContentText id="alert-dialog-description">
                        <hr/>
                        <div style={{width:"100%"}}>
                        {hcontent}
                        </div>
                    </DialogContentText>
                    <hr/>
                    { unum &&( // 로그인 상태일 때만 해당 컴포넌트가 보이도록 설정
                    <div className="input-group">
                    <textarea class="form-control" style={{width:"75%",height:"50px",border:"1px solid gray",fontSize:"12px"}}
                              placeholder="댓글을 작성 해 보세요"></textarea>
                        <button type="button" className="primary_button" style={{width:"25%"}}>댓글작성</button>
                    <pre style={{width:'100%',height:'100%',border:"1px solid gray"}}>
                        {/*댓글 출력 위치*/}
                    </pre>
                    </div>
                        )}
                </DialogContent>
                <DialogActions>
                    <div style={{width:'100%',position:"relative",top:"30px",right:"10px"}}>
                    <Button style={{width:'100px'}}onClick={handleClose} autoFocus> 취소</Button>
                    </div>
                    </DialogActions>
                </div>
            </Dialog>

        </div>
    );
}

export default HugiRowList;