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
import Axios from "axios";
function HugiRowList(props) {
    const {hcontent, hphoto,hwriteday,hlike, ref, step, depth, unum: postUnum } = props;
    const url = process.env.REACT_APP_BOARDURL;

    const navi=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
    const [unum, setUnum] = useState(null); // unum 상태 추가
    const [open, setOpen] = React.useState(false);
    const [rhnum,setRhnum]= useState();
    const [hnum,setHnum]=useState();
    const [rhcontent,setRhcontent]=useState();
    const [rhwriteday,setRhwriteday]=useState();
    const [comments, setComments] = useState([]);
    const [commentAuthors, setCommentAuthors] = useState({});
    // const [userDto, setUserDto] = useState({}); // UserDto 상태 추가


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

        // // UserDto 데이터를 가져오는 API 호출
        // fetchUserDto();
        // getCommentAuthors();// 댓글 작성자의 uname을 가져오기 위해 API 호출
    }, []);

    const checkLoginStatus = () => {
        // unum이 존재하면 로그인 상태로 간주
        if (unum) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    // const fetchUserDto = () => {
    //     Axios.get(`/api/user/${unum}`)
    //         .then((res) => {
    //             setUserDto(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    // const getCommentAuthors = () => {
    //     Axios.get('/api/getUser')
    //         .then((res) => {
    //             setCommentAuthors(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    const handleCommentSubmit = () => {
        // 댓글 작성 후 처리하는 로직을 구현합니다.
        // 서버에 댓글 작성 요청을 보내고, 성공적으로 작성되면 댓글 목록을 업데이트합니다.
        // 이후 댓글 입력 필드를 초기화합니다.
        const newComment = {
            hnum: hnum,
            unum: unum,
            hcontent: rhcontent,
            ref: ref,
            step: step + 1,
            depth: depth + 1,
        };
        Axios.post('/rehugi/newcomment', newComment)
            .then((res) => {
                setComments([...comments, res.data]);
                setRhcontent('');
            })
            .catch((error) => {
                console.log(error);
            });

    };
    const getCommentAuthorName = (unum) => {
        const commentAuthor = commentAuthors.find(author => author.unum === unum);
        return commentAuthor ? commentAuthor.uname : '';
    };
    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={postUnum}
                        src="/static/images/avatar/1.jpg"
                        />
                <h5>{postUnum}</h5>
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
                    <Avatar className="list_avatar" alt={postUnum}
                            src="/static/images/avatar/1.jpg"
                            style={{width:"35px",height:"35px"}}
                    />
                    <b style={{position:"relative",bottom:"35px",left:"50px",fontSize:"18px" }}>{postUnum}</b>
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
                            <pre style={{ width: '100%', height: '100%', border: '1px solid lightgray',borderRadius:"5px" }}>
                  {/* 댓글 출력 위치 */}
                                {comments.map((comment) => (
                                    <div key={comment.hnum}>
                                        <Avatar className="list_avatar" alt={postUnum} src="/static/images/avatar/1.jpg" style={{ width: '35px', height: '35px' }} />
                                        <b style={{position:"relative",bottom:"28px",left:"40px",fontSize:"14px"}}>{getCommentAuthorName(comment.unum)}:</b>
                                        <span style={{position:"relative",bottom:"28px",left:"40px",fontSize:"14px"}}>{comment.hcontent}</span>
                                        <br />
                                    </div>
                                ))}
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