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

    const [openReplyForm, setOpenReplyForm] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
    const [unum, setUnum] = useState(null); // unum 상태 추가
    const [open, setOpen] = React.useState(false);
    const [rhnum, setRhnum] = useState(null);
    const [rhcontent, setRhcontent] = useState('');
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState(''); // 대댓글 작성 폼의 내용 상태
    // const [commentAuthors, setCommentAuthors] = useState({});
    const [userDto, setUserDto] = useState();

    const [commentError, setCommentError] = useState(false); // 댓글 입력 오류 여부 상태 추가
    const [replyError, setReplyError] = useState(false); // 대댓글 입력 오류 여부 상태 추가
    const [errorCommentId, setErrorCommentId] = useState(null); // 오류가 발생한 대댓글의 ID 상태 추가

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
        Axios.get(`/rehugi/comments?hnum=${hnum}`)
            .then((res) => {
                // 댓글과 대댓글을 계층적으로 정렬하는 로직 추가
                const sortedComments = sortComments(res.data);
                setComments(sortedComments);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const sortComments = (comments) => {
        const sorted = [];
        const commentMap = {};

        // 댓글을 먼저 정렬
        for (const comment of comments) {
            if (!comment.ref) {
                sorted.push(comment);
                commentMap[comment.rhnum] = comment;
            }
        }

        // 각 댓글에 대한 대댓글을 정렬
        for (const comment of comments) {
            if (comment.ref) {
                const parentComment = commentMap[comment.ref];
                if (parentComment) {
                    if (!parentComment.comments) {
                        parentComment.comments = [];
                    }
                    parentComment.comments.push(comment);
                }
            }
        }

        return sorted;
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
        // 댓글 내용이 비어 있는지 확인합니다.
        if (rhcontent.trim() === '') {
            setCommentError(true);
            return;
        }

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
                setCommentError(false);
            })
            .catch((error) => {
                console.log('오류가 발생했습니다.', error.message);
            });
    };
    const submitReply = (comment) => {
        // 대댓글 내용이 비어 있는지 확인합니다.
        if (replyContent.trim() === '') {
            setReplyError(true);
            setErrorCommentId(comment.rhnum); // 오류가 발생한 대댓글 ID를 저장합니다.
            return;
        }
        const unum = sessionStorage.getItem('unum');
        const newReply = {
            unum: parseInt(unum),
            hnum: hnum,
            rhcontent: replyContent,
            ref: comment.ref,
            step: comment.step + 1,
            depth: comment.depth + 1,
        };

        Axios.post('/rehugi/newreply', newReply, {
            params: {
                unum: unum,
            },
        })
            .then((res) => {
                console.log('댓글이 성공적으로 추가되었습니다.');
                // 추가 작업 수행
                getComments(); // 댓글 목록을 업데이트합니다.
                toggleReplyForm(comment.rhnum); // 대댓글 작성 폼을 닫습니다.
                setReplyError(false);
                setErrorCommentId(null); // 오류가 발생한 대댓글 ID를 초기화합니다.
            })
            .catch((error) => {
                console.log('댓글 추가 중 오류가 발생했습니다.', error);
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
    const toggleReplyForm = (rhnum) => {
        if (openReplyForm === rhnum) {
            setOpenReplyForm(null);
        } else {
            setOpenReplyForm(rhnum);
        }
        setReplyContent(''); // 대댓글 작성 폼의 내용을 초기화합니다.
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
            <span className="spanWriteday">{hwriteday}</span>

            <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto}/>
            {/*<img className="list_image" src={process.env.PUBLIC_URL +`${hphoto}`} alt="" />*/}
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div className="IconsZone">
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
                <div className="Dialog_div">
                    <DialogTitle id="alert-dialog-title">
                        <div className="Dialog_Title">
                            <Avatar className="list_avatar" alt={unickname} src=""/>
                            <span className="spanCommentList">
                            {unickname} 님의 댓글 목록
                        </span>
                        </div>
                    </DialogTitle>
                    <DialogContent style={{width: "100%", overflowX: "hidden"}}>
                        <img className="list_image"
                             src={`${url}${hphoto}`} alt="" value={hphoto}/>
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
                    style={{
                        width: '70%',
                        height: '50px',
                        border: '1px solid lightgray',
                        fontSize: '12px',
                        resize: "none"
                    }}
                    placeholder="댓글을 작성해 보세요"
                    value={rhcontent}
                    onChange={handleCommentChange}
                ></textarea>
                                <button
                                    type="button"
                                    className="primary_button_Comment"
                                    onClick={handleCommentSubmit}>
                                    댓글작성
                                </button>
                            </div>
                        )}
                        {commentError && (
                            <div className="CommentAlert">
                                <p style={{color: 'red'}}>댓글을 입력해주세요.</p>
                            </div>
                        )}
                        <pre className="preComment">
                                    {/* 댓글 출력 위치 */}
                            {comments && comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.rhnum}>
                                        <Avatar className="list_avatar_Comment" alt={unickname} src=""/>
                                        <b className="CommentNickname">
                                            {unickname}({uname}):</b>
                                        &nbsp;
                                        <span className="spanRhcontent">
                                                    {comment.rhcontent}
                                                </span>
                                        {parseInt(props.unum) === parseInt(unum) && (
                                            <DeleteIcon className="Delete_Icon"
                                                        onClick={() =>
                                                            handleClickDeleteComment(comment.rhnum)}/>
                                        )}
                                        <br/>
                                        <span className="spanRhwriteday">
                                                    {comment.rhwriteday}
                                                </span>
                                        {unum && (
                                            <a
                                                className="ReplyForm"
                                                onClick={() => toggleReplyForm(comment.rhnum)}
                                            >
                                                {openReplyForm === comment.rhnum ? "닫기" : "댓글"}
                                            </a>
                                        )}
                                        {/* 대댓글 작성 폼 */}
                                        {openReplyForm === comment.rhnum && unum && (
                                            <div className="input-group"
                                                 style={{width: "230px", marginLeft: '10px'}}>
                                                        <textarea
                                                            className="form-control"
                                                            style={{
                                                                width: '67%',
                                                                height: '40px',
                                                                border: '1px solid lightgray',
                                                                fontSize: '12px',
                                                                resize: "none",
                                                            }}
                                                            placeholder="댓글을 작성해 보세요"
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                        ></textarea>
                                                <button
                                                    type="button"
                                                    className="primary_button_Reply"
                                                    onClick={() => submitReply(comment)}
                                                >
                                                    대댓글작성
                                                </button>
                                            </div>
                                        )}
                                        {replyError && errorCommentId === comment.rhnum && (
                                            <div className="CommentAlert">
                                                <p style={{color: 'red'}}>댓글을 입력해주세요.</p>
                                            </div>
                                        )}
                                        {/* 대댓글 출력 위치 */}
                                        {comment.comments && comment.comments.length > 0 && (
                                            <div className="Replydiv">
                                                {comment.comments.map((reply) => (
                                                    <div key={reply.rhnum} style={{marginLeft: '20px'}}>
                                                        <img src="../image/reply.png"/>
                                                        <Avatar
                                                            className="list_avatar_Reply"
                                                            alt={reply.unickname}
                                                            src=""
                                                        />
                                                        <div
                                                            style={{
                                                                marginLeft: '60px',
                                                                padding: '5px',
                                                                backgroundColor: '#f5f5f5',
                                                                borderRadius: '5px',
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    fontSize: '14px',
                                                                    marginBottom: '5px',
                                                                }}
                                                            >
                                                                {reply.unickname}({reply.uname}):
                                                            </b>
                                                            <span>
                                                                 {reply.rhcontent}
                                                                </span>
                                                            {parseInt(props.unum) === parseInt(unum) && (
                                                                <DeleteIcon
                                                                    className="Delete_Icon"
                                                                    onClick={() =>
                                                                        handleClickDeleteComment(reply.rhnum)}
                                                                />
                                                            )}
                                                            <br/>
                                                            <span
                                                                style={{
                                                                    fontSize: '10px',
                                                                }}
                                                            >
                                                            {reply.rhwriteday}
                                                                  </span>
                                                        </div>
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
                    </DialogContent>
                    <DialogActions>
                        <div className="Dialog_Foot_div">
                            <Button style={{width: '100px'}} onClick={handleClose} autoFocus> 취소</Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default HugiRowList;