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
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from "axios";
function HugiRowList(props) {
    const {hnum, hcontent, hphoto,hwriteday,hlike,uname,unickname, ref, step, depth} = props;
    const url = process.env.REACT_APP_BOARDURL;

    const navi=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부

    const [unum, setUnum] = useState(null); // unum 상태 추가
    // const [uname,setUname]=useState();
    // const [unickname,setUnickname]=useState();

    const [open, setOpen] = React.useState(false);
    const [rhnum,setRhnum]= useState();
    const [rhcontent,setRhcontent]=useState('');
    const [comments, setComments] = useState([]);
    const [commentAuthors, setCommentAuthors] = useState({});
    const [userDto,setUserDto]=useState();
    const handleClickOpen = () => {
        if (unum==null){
            alert("로그인을 먼저 해주세요!");
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const unum = sessionStorage.getItem('unum');
        setUnum(unum);
        checkLoginStatus();
        fetchUserDto(unum); // fetchUserDto 함수 호출 추가
        getComments();
    }, []);
    const getComments = () => {
        // 서버 API를 호출하여 댓글 목록을 가져옵니다.
        Axios.get(`/rehugi/comments?hnum=${hnum}`)
            .then((res) => {
                setComments(res.data); // 서버에서 받아온 댓글 목록을 상태에 저장합니다.
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const checkLoginStatus = () => {
        // unum이 존재하면 로그인 상태로 간주
        if (unum) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    const fetchUserDto = (unum) => {
        if(unum) {
            Axios.get(`/hugi/user/${unum}`)
                .then((res) => {
                    // console.log(res.data);
                    setUserDto(res.data);
                    // setUnickname(res.data.unickname); // unickname 값을 설정합니다.
                    // setUname(res.data.uname); // uname 값을 설정합니다.
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        // 404 오류 처리
                        // 콘솔에 오류 메시지를 출력하지 않음
                    } else {
                        console.log('오류가 발생했습니다.', error.message);
                    }
                });
            }
        };
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        const newComment = {
            rhnum: rhnum,
            hnum: hnum,
            unum: unum,
            uname:uname,
            unickname:unickname,
            rhcontent: rhcontent,
            rhwriteday: formattedDate,
            ref: ref,
            step: step + 1,
            depth: depth + 1,
        };

        // 서버 API를 호출하여 새 댓글을 작성합니다.
        Axios.post('/rehugi/newcomment', newComment)
            .then((res) => {
                // 새 댓글이 성공적으로 작성되면 서버에서 업데이트된 댓글 목록을 다시 가져옵니다.
                getComments();
                setRhcontent('');
            })
            .catch((error) => {
                console.log('오류가 발생했습니다.', error.message);
            });
    };

    const getCommentAuthorName = (unum) => {
        const commentAuthor = Object.values(commentAuthors).find(author => author.unum === unum);
        return commentAuthor ? commentAuthor.rhcontent : '';
    };

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={unickname}
                        src=""
                        />
                <h5>{unickname}({uname})</h5>
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
                    <Avatar className="list_avatar" alt={unickname}
                            src=""
                            style={{width:"35px",height:"35px"}}
                    />
                    <b style={{position:"relative",bottom:"35px",left:"50px",fontSize:"18px" }}>{unickname}</b>
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
                <textarea
                    className="form-control"
                    style={{ width: '70%', height: '50px', border: '1px solid lightgray', fontSize: '12px' }}
                    placeholder="댓글을 작성해 보세요"
                    value={rhcontent}
                    onChange={(e) => setRhcontent(e.target.value)}
                ></textarea>
                            <button type="button" className="primary_button" style={{ width: '30%',borderRadius:"5px" }} onClick={handleCommentSubmit}>
                                댓글 작성
                            </button>

                            <pre style={{ width: '100%', height: '100%', border: '1px solid lightgray', borderRadius: '5px' }}>
                                {/* 댓글 출력 위치 */}
                                {comments.length === 0 ? (
                                    <div>댓글이 없습니다.</div>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment.hnum}>
                                            <Avatar className="list_avatar" alt={unickname} src="" style={{ width: '35px', height: '35px' }} />
                                            <b style={{ position: 'relative', bottom: '28px', left: '40px', fontSize: '14px' }}>{unickname}({uname}):</b>
                                            <span style={{ position: 'relative', bottom: '28px', left: '40px', fontSize: '14px' }}>{comment.rhcontent}</span>
                                            {comment.unum === comment.unum && (
                                                <DeleteIcon style={{ position: 'relative', bottom: '29px', left: '45px', fontSize: '20px' }} />
                                            )}
                                            <span style={{ float: 'right',position:"relative",bottom:"25px" }}>{comment.rhwriteday}</span>
                                        </div>
                                    ))
                                )}
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