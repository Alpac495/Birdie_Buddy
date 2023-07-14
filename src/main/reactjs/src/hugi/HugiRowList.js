import React, { useEffect, useState } from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';

function HugiRowList(props) {
    const { hnum, hcontent, hphoto, hwriteday,Unickname, hlike} = props;
    // const unickname="test";
    const url = process.env.REACT_APP_BOARDURL;
    const navi = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [openReplyForm, setOpenReplyForm] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부

    const [unum, setUnum] = useState(); // unum 상태 추가
    const [unickname,setUnickname]=useState();
    const [rhnum, setRhnum] = useState(null);
    const [rhcontent, setRhcontent] = useState('');
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [postUserNickname,setPostUserNickname]=useState();

    const [commentError, setCommentError] = useState(false); // 댓글 입력 오류 여부 상태 추가
    const [replyError, setReplyError] = useState(false); // 대댓글 입력 오류 여부 상태 추가
    const [errorCommentId, setErrorCommentId] = useState(null); // 오류가 발생한 대댓글의 ID 상태 추가


    const checkLoginStatus = () => {
        if (unum) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    const handleClickOpen = () => {
        if (unum == null) {
            alert('로그인을 먼저 해주세요!');
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
            const confirmed = window.confirm('정말 삭제하시겠습니까?');
            if (confirmed) {
                deleteAllComments()
                    .then(() => {
                        Axios.delete(`/hugi/delete/${hnum}`)
                            .then(() => {
                                console.log('게시물이 성공적으로 삭제되었습니다.');
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
                    resolve();
                })
                .catch((error) => {
                    console.log('댓글과 답글 삭제 중 오류가 발생했습니다.', error);
                    reject(error);
                });
        });
    };

    const handleDeleteComment = (rhnum) => {
        Axios.delete(`/rehugi/deletecomment/${rhnum}`)
            .then(() => {
                console.log('댓글 삭제 완료');
                getComments();
            })
            .catch((error) => {
                console.log('댓글 삭제 중 오류가 발생함', error);
            });
    };

    const handleClickDeleteComment = (rhnum) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            handleDeleteComment(rhnum);
        }
    };

    // getComments 함수 내부에서도 setNickname을 호출하여 unickname 값을 설정합니다.
    const getComments = () => {
        Axios.get(`/rehugi/comments?hnum=${hnum}`)
            .then((res) => {
                const sortedComments = sortComments(res.data);
                console.log(res.data)
                setComments(sortedComments);

                res.data.forEach((comment) => {
                    // fetchUserNickname(comment.unum, comment); // 댓글 작성자의 unickname 가져오기

                    if (comment.comments) {
                        comment.comments.forEach((reply) => {
                            // fetchUserNickname(reply.unum, reply); // 대댓글 작성자의 unickname 가져오기
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const fetchPostUserNickname = async (unum) => {
        if (unum) {
            try {
                const res = await Axios.get(`/hugi/getUser?unum=${unum}`);
                const unickname = res.data;

                if (unickname) {
                    setPostUserNickname(unickname);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // 404 오류 처리
                } else {
                    console.log('오류가 발생했습니다.', error.message);
                }
            }
        }
    };
    const sortComments = (comments) => {
        const sorted = [];
        const commentMap = {};

        for (const comment of comments) {
            if (!comment.ref) {
                sorted.push(comment);
                commentMap[comment.rhnum] = comment;
            }
        }

        for (const comment of comments) {
            if (comment.ref) {
                const parentComment = commentMap[comment.ref];
                if (parentComment) {
                    if (!parentComment.comments) {
                        parentComment.comments = [];
                    }
                    parentComment.comments.push(comment);
                    // fetchUserNickname(comment.unum, comment); // 대댓글 작성자의 unickname 가져오기
                }
            }
        }

        return sorted;
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (rhcontent.trim() === '') {
            setCommentError(true);
            return;
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        try {
            const res = await Axios.get(`/hugi/getUser?unum=${sessionStorage.unum}`);
            const userNickname = res.data;
            if (userNickname) {
                const newComment = {
                    rhnum: rhnum,
                    hnum: hnum,
                    unum: sessionStorage.unum,
                    rhcontent: rhcontent,
                    rhwriteday: formattedDate,
                    ref: null,
                    step: null,
                    depth: null,
                };

                await Axios.post('/rehugi/newcomment', newComment);
                getComments();
                setRhcontent('');
                setCommentError(false);
            }
        } catch (error) {
            console.log('오류가 발생했습니다.', error.message);
        }
    };

    const submitReply = (comment) => {
        if (replyContent.trim() === '') {
            setReplyError(true);
            setErrorCommentId(comment.rhnum);
            return;
        }

        const newReply = {
            hnum: hnum,
            unum:sessionStorage.unum,
            rhcontent: replyContent,
            ref: comment.rhnum,
            step: comment.step + 1,
            depth: comment.depth + 1,
        };

        Axios.post("/rehugi/newreply?unum="+unum, newReply)
            .then((res) => {
                console.log('댓글이 성공적으로 추가되었습니다.');
                getComments();
                toggleReplyForm(comment.rhnum);
                setReplyError(false);
                setErrorCommentId(null);
            })
            .catch((error) => {
                console.log('댓글 추가 중 오류가 발생했습니다.', error);
            });
    };

    const MAX_COMMENT_LENGTH = 20;

    const handleCommentChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= MAX_COMMENT_LENGTH) {
            setRhcontent(inputValue);
        }
    };

    const toggleReplyForm = (rhnum) => {
        if (openReplyForm === rhnum) {
            setOpenReplyForm(null);
        } else {
            setOpenReplyForm(rhnum);
        }
        setReplyContent('');
    };

    useEffect(() => {
        setUnum(sessionStorage.unum);
        checkLoginStatus();
        fetchPostUserNickname(props.unum); // 작성자의 unickname 가져오기
        getComments();
    }, []);

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={unickname} src="" />
                <span className="spanName">{postUserNickname}</span>
            </div>
            &nbsp;
            <span className="spanWriteday">{hwriteday}</span>

            <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto} />
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr />
            <div className="IconsZone">
                <MessageIcon onClick={handleClickOpen} className="Icons" />
                {parseInt(props.unum) === parseInt(unum) && (
                    <DeleteIcon onClick={handleClickDelete} className="Icons" />
                )}
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className="Dialog_Title">
                        <Avatar className="list_avatar_Comment1" alt={unickname} src="" />
                        <span className="spanCommentList">
                        {unickname}
                      </span>
                    </div>
                </DialogTitle>
                <DialogContent style={{ width: '100%', overflowX: 'hidden' }}>
                    <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto} />
                    <DialogContentText id="alert-dialog-description">
                        <hr />
                        <div style={{ width: '100%' }}>{hcontent}</div>
                    </DialogContentText>
                    <hr />
                    {unum && (
                        <div className="input-group">
              <textarea
                  className="form-control"
                  style={{
                      width: '70%',
                      height: '50px',
                      border: '1px solid lightgray',
                      fontSize: '12px',
                      resize: 'none',
                  }}
                  placeholder="댓글을 작성해 보세요"
                  value={rhcontent}
                  onChange={handleCommentChange}
              ></textarea>
                            <button type="button" className="primary_button_Comment" onClick={handleCommentSubmit}>
                                댓글 작성
                            </button>
                        </div>
                    )}

                    {commentError && (
                        <div>
                            <p className="CommentAlert">댓글을 입력해주세요.</p>
                        </div>
                    )}
                    <pre className="preComment">
  {comments && comments.length > 0 ? (
      comments.map((comment) => (
          <div key={comment.rhnum}>
              <div>
                  <span className="Commentname">{comment.unickname}:</span>
                  <Avatar className="list_avatar_Comment2" alt={comment.unickname} src="" />
                  <pre className="preRhcontent">{comment.rhcontent}</pre>
                  <br/>
                  <span className="spanRhwriteday">{comment.rhwriteday}</span>
                  {unum && (
                      <a className="Click_ReplyForm" onClick={() => toggleReplyForm(comment.rhnum)}>
                          {openReplyForm === comment.rhnum ? '닫기' : '댓글'}
                      </a>
                  )}
                  {parseInt(comment.unum) === parseInt(unum) && (
                      <DeleteIcon
                          className="Delete_Icon"
                          onClick={() => handleClickDeleteComment(comment.rhnum)}
                      />
                  )}
              </div>
              {openReplyForm === comment.rhnum && unum && (
                  <div className="input-group" style={{ width: '230px', marginBottom:"30px" }}>
            <textarea
                className="form-control"
                style={{
                    width: '67%',
                    height: '30px',
                    border: '1px solid lightgray',
                    fontSize: '12px',
                    resize: 'none',
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
                          대댓글 작성
                      </button>
                  </div>
              )}
              {replyError && comment.rhnum === errorCommentId && (
                  <div>
                      <p className="ReplyAlert">대댓글을 입력해주세요.</p>
                  </div>
              )}
              {comment.comments && comment.comments.length > 0 && (
                  <details className="details_Reply">
                      <summary>댓글보기</summary>
                      {comment.comments &&
                          comment.comments.map((reply) => (
                              <div key={reply.rhnum} className="Comment_Reply_List">
                                  <Avatar className="list_avatar_Comment2" alt={reply.unickname} src="" />
                                  <b className="ReplyNickname">
                                      {reply.unickname}:
                                  </b>
                                  &nbsp;
                                  <pre className="preReplyRhcontent">{reply.rhcontent}</pre>
                                  <br />
                                  <span className="spanRhwriteday">{reply.rhwriteday}</span>
                                  {parseInt(reply.unum) === parseInt(unum) && (
                                      <DeleteIcon
                                          className="Delete_Icon"
                                          onClick={() => handleClickDeleteComment(reply.rhnum)}
                                      />
                                  )}
                              </div>
                          ))}
                  </details>
              )}
          </div>
      ))
  ) : (
      <p>댓글이 없습니다.</p>
  )}
</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HugiRowList;
