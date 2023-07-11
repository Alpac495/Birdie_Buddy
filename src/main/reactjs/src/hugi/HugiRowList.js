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
    const {hnum, hcontent, hphoto, hwriteday, hlike, uname, unickname, ref, step, depth} = props;

    const url = process.env.REACT_APP_BOARDURL;
    const navi = useNavigate();

    const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
    const [unum, setUnum] = useState(null); // unum 상태 추가
    const [open, setOpen] = React.useState(false);
    const [rhnum, setRhnum] = useState(null);
    const [rhcontent, setRhcontent] = useState('');
    const [comments, setComments] = useState([]);
    // const [commentAuthors, setCommentAuthors] = useState({});
    const [userDto, setUserDto] = useState();

    const handleClickOpen = () => {
        if (unum == null) {
            alert("로그인을 먼저 해주세요!");
        } else {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickDelete = () => {
        const sessionUnum = sessionStorage.getItem('unum');
        if (parseInt(props.unum) === parseInt(sessionUnum)) {
            // 확인 메시지 출력
            const confirmed = window.confirm('정말 삭제하시겠습니까?');
            if (confirmed) {
                // 댓글과 답글 모두 삭제 요청을 보냅니다.
                deleteAllComments()
                    .then(() => {
                        // 댓글과 답글 삭제가 성공하면 게시물 삭제 요청을 보냅니다.
                        Axios.delete(`/hugi/delete/${hnum}`)
                            .then(() => {
                                // 삭제 요청이 성공하면 여기에서 필요한 작업을 수행합니다.
                                console.log('게시물이 성공적으로 삭제되었습니다.');
                                // 페이지를 새로고침하여 새로운 게시물 목록을 가져옵니다.
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.log('게시물 삭제 중 오류가 발생했습니다.', error);
                            });
                    })
                    .catch((error) => {
                        console.log('댓글과 답글 삭제 중 오류가 발생했습니다.', error);
                    });
            }
        } else {
            alert('자신이 작성한 게시물만 삭제할 수 있습니다.');
        }
    };
    const deleteAllComments = () => {
        return new Promise((resolve, reject) => {
            Axios.delete(`/rehugi/deleteAllComments/${hnum}`)
                .then(() => {
                    console.log('댓글과 답글이 성공적으로 삭제되었습니다.');
                    resolve(); // Promise를 성공(resolve) 상태로 변경
                })
                .catch((error) => {
                    console.log('댓글과 답글 삭제 중 오류가 발생했습니다.', error);
                    reject(error); // Promise를 실패(reject) 상태로 변경
                });
        });
    };
    const handleDeleteComment = (rhnum) => {
        Axios.delete(`/rehugi/deletecomment/${rhnum}`)
            .then(() => {
                console.log('댓글 삭제 완료');
                // 댓글 삭제가 성공하면 필요한 작업을 수행합니다.
                // 예를 들어, 삭제된 댓글을 화면에서 제거하는 등의 작업을 수행할 수 있습니다.
                getComments();
            })
            .catch((error) => {
                console.log('댓글 삭제중 오류가 발생함', error);
            });
    };

// 삭제 버튼 클릭 시 handleDeleteComment 호출
    const handleClickDeleteComment = (rhnum) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            handleDeleteComment(rhnum);
        }
    };

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
        if (unum) {
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
            uname: uname,
            unickname: unickname,
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

    const MAX_COMMENT_LENGTH = 20; // 최대 글자수 제한
    const handleCommentChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= MAX_COMMENT_LENGTH) {
            setRhcontent(inputValue);
        }
    };
    // const getCommentAuthorName = (unum) => {
    //     const commentAuthor = Object.values(commentAuthors).find(author => author.unum === unum);
    //     return commentAuthor ? commentAuthor.rhcontent : '';
    // };
    const toggleReplyForm = () => {
        setIsReplyFormVisible((prevVisible) => !prevVisible);
        setRhcontent(''); // 폼이 숨겨질 때는 대댓글 내용을 초기화합니다.
    };

    useEffect(() => {
        const unum = sessionStorage.getItem('unum');
        setUnum(unum);
        checkLoginStatus();
        fetchUserDto(unum); // fetchUserDto 함수 호출 추가
        getComments();
    }, []);

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={unickname}
                        src=""
                />
                <h5>{unickname}({uname})</h5>
            </div>
            &nbsp;
            <span style={{marginLeft: "10px", color: "gray"}}>{hwriteday}</span>

            <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto}/>
            {/*<img className="list_image" src={process.env.PUBLIC_URL +`${hphoto}`} alt="" />*/}
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div style={{width: "100%", marginBottom: "10px", marginLeft: "10px"}}>
                <MessageIcon onClick={handleClickOpen} className="Icons"/>
                {parseInt(props.unum) === parseInt(unum) && (
                    <DeleteIcon onClick={handleClickDelete} className="Icons"/>
                )}
            </div>

            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{width: "100%", height: "580px",overflowX: "hidden"}}>
                    <DialogTitle id="alert-dialog-title">
                        <Avatar className="list_avatar" alt={unickname}
                                src=""
                                style={{width: "35px", height: "35px"}}
                        />
                        <b style={{
                            position: "relative",
                            bottom: "35px",
                            left: "50px",
                            fontSize: "18px"
                        }}>{unickname}</b>
                    </DialogTitle>
                    <DialogContent style={{width: "100%", overflowX: "hidden"}}>
                        <img className="list_image" src={`${url}${hphoto}`} alt="" style={{width: "100%"}}
                             value={hphoto}/>
                        <DialogContentText id="alert-dialog-description">
                            <hr/>
                            <div style={{width: "100%"}}>
                                {hcontent}
                            </div>
                        </DialogContentText>
                        <hr/>
                        {unum && ( // 로그인 상태일 때만 해당 컴포넌트가 보이도록 설정
                            <div className="input-group">
                <textarea
                    className="form-control"
                    style={{width: '70%', height: '50px', border: '1px solid lightgray', fontSize: '12px',resize:"none"}}
                    placeholder="댓글을 작성해 보세요"
                    value={rhcontent}
                    onChange={handleCommentChange}
                ></textarea>
                                <button type="button" className="primary_button"
                                        style={{width: '30%', borderRadius: "5px"}} onClick={handleCommentSubmit}>
                                    댓글작성
                                </button>

                                <pre style={{
                                    width: '100%',
                                    height: '100%',
                                    border: '1px solid lightgray',
                                    borderRadius: '5px'
                                }}>
                                {/* 댓글 출력 위치 */}
                                    {comments && comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div key={comment.rhnum}>
                                                <Avatar className="list_avatar" alt={unickname} src=""
                                                        style={{
                                                            position: "relative",
                                                            width: '35px',
                                                            height: '35px'
                                                        }}/>
                                                <b style={{
                                                    position: 'relative',
                                                    bottom: '28px',
                                                    left: '40px',
                                                    fontSize: '14px'
                                                }}>{unickname}({uname}):</b>&nbsp;
                                                <span style={{
                                                    position: 'relative',
                                                    bottom: '28px',
                                                    left: '40px',
                                                    fontSize: '14px'
                                                }}>{comment.rhcontent}</span>
                                                {parseInt(props.unum) === parseInt(unum) && (
                                                    <DeleteIcon style={{
                                                        position: 'relative',
                                                        bottom: '29px',
                                                        left: '45px',
                                                        fontSize: '20px',
                                                        cursor: "pointer"
                                                    }} onClick={() => handleClickDeleteComment(comment.rhnum)}/>
                                                )}
                                                <br/>
                                                <span style={{
                                                    position: "relative",
                                                    bottom: "27px",
                                                    left: "5px",
                                                    fontSize: "10px"
                                                }}>{comment.rhwriteday}</span>
                                                {unum && (
                                                    <button
                                                        type="button"
                                                        className="primary_button"
                                                        style={{ position:"relative",right:"80px",marginBottom:"10px",width:"40px" }}
                                                        onClick={toggleReplyForm}
                                                    >
                                                        {isReplyFormVisible ? '닫기' : '열기'}
                                                    </button>
                                                )}
                                                {/* 대댓글 작성 폼 */}
                                                {isReplyFormVisible && unum && (
                                                    <div className="input-group"
                                                         style={{width:"230px",marginLeft: '10px', marginTop: '5px'}}>
                                                        <textarea
                                                            className="form-control"
                                                            style={{
                                                                width: '67%',
                                                                height: '40px',
                                                                border: '1px solid lightgray',
                                                                fontSize: '12px',
                                                                resize:"none",
                                                            }}
                                                            placeholder="대댓글을 작성해 보세요"
                                                            value={rhcontent}
                                                            onChange={handleCommentChange}
                                                        ></textarea>
                                                        <button
                                                            type="button"
                                                            className="primary_button"
                                                            style={{borderRadius: '5px',width:"33%",height:"40px",resize:"none"}}
                                                            onClick={(e) => handleCommentSubmit(e, comment.ref)}
                                                        >
                                                            대댓글작성
                                                        </button>
                                                    </div>
                                                )}

                                                {/* 대댓글 출력 위치 */}
                                                {comment.comments && comment.comments.length > 0 && (
                                                    <div style={{marginLeft: '30px', marginTop:"5px"}}>
                                                        {comment.comments.map((reply) => (
                                                            <div key={reply.rhnum}>
                                                                <Avatar
                                                                    className="list_avatar"
                                                                    alt={reply.unickname}
                                                                    src=""
                                                                    style={{
                                                                        position: 'relative',
                                                                        width: '35px',
                                                                        height: '35px',
                                                                    }}
                                                                />
                                                                <b
                                                                    style={{
                                                                        position: 'relative',
                                                                        bottom: '28px',
                                                                        left: '40px',
                                                                        fontSize: '14px',
                                                                    }}
                                                                >
                                                                    {reply.unickname}({reply.uname}):
                                                                </b>
                                                                <span
                                                                    style={{
                                                                        position: 'relative',
                                                                        bottom: '28px',
                                                                        left: '40px',
                                                                        fontSize: '14px',
                                                                    }}
                                                                >
                                                                 {reply.rhcontent}
                                                                    </span>
                                                                {parseInt(props.unum) === parseInt(unum) && (
                                                                    <DeleteIcon
                                                                        style={{
                                                                            position: 'relative',
                                                                            bottom: '29px',
                                                                            left: '45px',
                                                                            fontSize: '20px',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={() => handleClickDeleteComment(reply.rhnum)}
                                                                    />
                                                                )}
                                                                <br/>
                                                                <span
                                                                    style={{
                                                                        position: 'relative',
                                                                        bottom: '27px',
                                                                        left: '40px',
                                                                        fontSize: '10px',
                                                                    }}
                                                                >
                                                            {reply.rhwriteday}
                                                                  </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                &nbsp;
                                            </div>
                                        ))

                                    ) : (
                                        <div>댓글이 없습니다.</div>

                                    )}

                            </pre>

                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <div style={{width: '100%', position: "relative", top: "30px", right: "10px"}}>
                            <Button style={{width: '100px'}} onClick={handleClose} autoFocus> 취소</Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>

        </div>
    );
}

export default HugiRowList;