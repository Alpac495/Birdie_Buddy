import React, {useEffect, useState} from 'react';
import {useScript} from "./hooks";
import './List.css';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import {useNavigate} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';
import {FavoriteBorder, FavoriteSharp} from "@mui/icons-material";

function HugiRowList(props) {
    const {hnum, hcontent, hphoto, hwriteday, hlike} = props;
    // const unickname="test";
    const url = process.env.REACT_APP_HUGI;
    const navi = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openReplyForm, setOpenReplyForm] = useState(null);
    const [showLike, setShowLike] = useState(props.showLike || false);

    const [unum, setUnum]=useState('');
    const [rhnum, setRhnum] = useState(null);
    const [rhcontent, setRhcontent] = useState('');
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [postUserNickname, setPostUserNickname] = useState();

    const [commentError, setCommentError] = useState(false); // 댓글 입력 오류 여부 상태 추가
    const [replyError, setReplyError] = useState(false); // 대댓글 입력 오류 여부 상태 추가
    const [errorCommentId, setErrorCommentId] = useState(null); // 오류가 발생한 대댓글의 ID 상태 추가

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleClickModify = (hnum) =>{
        if (unum === 0) {
            alert('로그인을 먼저 해주세요!');
        } else {
           // console.log("unickname>>"+postUserNickname);//success
           // console.log("hnum,unum,hphoto,hcontent,hlike>>"+hnum+","+unum+","+hphoto+","+hcontent+","+hlike);//success
            navi(`/hugi/modify/${hnum}`, {
                hnum: hnum,
                unum: unum,
                hlike: hlike,
                postUserNickname: postUserNickname,
                hcontent: hcontent,
                hphoto: hphoto,
                hwriteday: hwriteday,
            });
        }
    };
    const handleClickShare = () => {
        const client_id = '8cvbhm3fzt'; // 본인의 클라이언트 아이디값
        const client_secret = 'j1cXNz7BdAeQ7SFB6H8HoKzSqkvLOIgkqYMs3a3N'; // 본인의 클라이언트 시크릿값
        const api_url = 'http://localhost:9009/hugi/shortenUrl'; // 스프링 백엔드의 컨트롤러 URL
        const longUrl = 'http://devster.kr/'; // 짧게 만들고 싶은 URL 입력칸입니다!!! (젠킨스주소 넣어보기)

        const requestData = {
            url: longUrl, // 서버에서 단축시킬 URL 대신에 목록 URL을 보냄
            client_id: client_id,
            client_secret: client_secret,
        };

        Axios.post(api_url, requestData)
            .then((res) => {
                const shortenedURL = res.data.result.url; // 단축 URL 값 가져오기
                console.log('Shortened URL:', shortenedURL);
                // TODO: 여기서 생성된 단축 URL을 사용하여 공유 기능을 구현합니다.
                // 예를 들어, 해당 URL을 SNS의 공유 버튼에 연결하거나 클립보드에 복사하는 등의 작업을 수행할 수 있습니다.
                // Clipboard API를 사용하여 클립보드에 복사
                navigator.clipboard.writeText(shortenedURL)
                    .then(() => {
                        console.log('URL복사완료!!:', shortenedURL);
                        setSnackbarOpen(true); // URL이 복사되면 Snackbar를 엽니다.
                    })
                    .catch((error) => {
                        console.error('Error copying to clipboard:', error);
                    });
            })
            .catch((error) => {
                console.error('Error generating shortened URL:', error);
            });
    };

    const unumchk=()=>{
        Axios.get("/login/unumChk")
            .then(res=> {
                setUnum(res.data);
            });
    }
    useEffect(() => {
        unumchk()
    }, [])

    const handleClickOpen = () => {
        if (unum == 0) {
            alert('로그인을 먼저 해주세요!');
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickLikeOn = () => {
        // 서버에 좋아요 정보를 전달하고, 성공적으로 처리되면
        // setShowLike(true)를 호출하여 버튼을 활성화합니다.
        Axios.post(`/hugi/like/${hnum}`)
            .then(() => {
                alert("좋아요를 눌렀습니다!");
                localStorage.setItem(`likeStatus_${hnum}`, "true"); // 좋아요 상태를 localStorage에 저장
                setShowLike(true);
            })
            .catch((error) => {
                console.log('좋아요 처리 중 오류가 발생했습니다.', error);
            });
    };
    const handleClickLikeOff = () => {
        // 서버에 좋아요 정보를 전달하고, 성공적으로 처리되면
        // setShowLike(false)를 호출하여 버튼을 비활성화합니다.
        Axios.delete(`/hugi/unlike/${hnum}`)
            .then(() => {
                alert("좋아요를 취소했습니다!");
                localStorage.setItem(`likeStatus_${hnum}`, "false"); // 좋아요 상태를 localStorage에 저장
                setShowLike(false);
            })
            .catch((error) => {
                console.log('좋아요 취소 처리 중 오류가 발생했습니다.', error);
            });
    };
    const handleClickDelete = () => {
        if (parseInt(props.unum) === parseInt(unum)) {
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
                // console.log(res.data)
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
                const Unickname = res.data;

                if (Unickname) {
                    setPostUserNickname(Unickname);
                    // console.log("pN=>"+Unickname);//success
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
    const handleClickDetail = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        if (unum === 0) {
            alert('로그인을 먼저 해주세요!');
        } else {
            navi(`/hugi/detail/${hnum}`, {
                userNum: unum,
                hnum: hnum,
                hphoto: hphoto,
                hcontent: hcontent,
                hwriteday: formattedDate,
                Unickname: props.Unickname // Unickname 매개변수를 사용합니다.
                // 여기에 다른 데이터도 추가할 수 있습니다.

            });
            fetchPostUserNickname(unum); // fetchPostUserNickname 함수에 unum 전달
            // console.log("unum>>"+unum);
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
            const res = await Axios.get(`/hugi/getUser?unum=${unum}`);
            const userNickname = res.data;
            if (userNickname) {
                const newComment = {
                    rhnum: rhnum,
                    hnum: hnum,
                    unum: unum,
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
            unum: unum,
            rhcontent: replyContent,
            ref: comment.rhnum,
            step: comment.step + 1,
            depth: comment.depth + 1,
        };

        Axios.post("/rehugi/newreply?unum=" + unum, newReply)
            .then((res) => {
                // console.log('댓글이 성공적으로 추가되었습니다.');
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
        getComments();
    }, [hnum, unum]);
    useEffect(() => {
        fetchPostUserNickname(props.unum); // 작성자의 unickname 가져오기
    }, [props.unum]);
    useEffect(() => {
        // 페이지가 로드될 때 localStorage에서 좋아요 상태를 불러와서 적용
        const likeStatus = localStorage.getItem(`likeStatus_${hnum}`);
        setShowLike(likeStatus === "true");
    }, [hnum]); // hnum이 변경될 때마다 실행

    // 마지막에 componentWillUnmount 등록
    useEffect(() => {
        return () => {
            // 컴포넌트가 unmount 되기 전에 localStorage에서 좋아요 상태 삭제
            localStorage.removeItem(`likeStatus_${hnum}`);
        };
    }, [hnum]);

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={''} src=''/>
                <span className="spanName">{postUserNickname}</span>
            </div>
            &nbsp;
            <span className="spanWriteday">{hwriteday}</span>
            <span>{props.hlike}</span>
            <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto} onClick={handleClickDetail}/>
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div className="IconsZone">
                {unum !== 0 && (showLike ? (
                    <FavoriteSharp onClick={handleClickLikeOff} className="Icons" style={{color: "red"}}/>
                ) : (
                    <FavoriteBorder onClick={handleClickLikeOn} className="Icons" style={{color: "red"}}/>
                ))}
                <MessageIcon onClick={handleClickOpen} className="Icons"/>
                <ShareIcon onClick={handleClickShare} className="Icons"/>
                {parseInt(props.unum) === parseInt(unum) && (
                    <EditIcon onClick={()=>handleClickModify(hnum)} className="Icons"/>
                )}
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
                <DialogTitle id="alert-dialog-title">
                    <div className="Dialog_Title">
                        <Avatar className="list_avatar_Comment1" alt={''} src=''/>
                        <span className="spanCommentList">
                        {postUserNickname}
                      </span>
                    </div>
                </DialogTitle>
                <DialogContent style={{width: '100%', overflowX: 'hidden'}}>
                    <img className="list_image" src={`${url}${hphoto}`} alt="" value={hphoto}/>
                    <DialogContentText id="alert-dialog-description">
                        <hr/>
                        <div style={{width: '100%'}}>{hcontent}</div>
                    </DialogContentText>
                    <hr/>
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
          <div key={comment.rhnum} style={{overflowX: 'hidden'}}>
              <div>
                  <span className="Commentname">{comment.unickname}:</span>
                  <Avatar className="list_avatar_Comment2" alt={''} src=''/>
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
                  <div className="input-group" style={{width: '230px', marginBottom: "30px"}}>
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
                                  <Avatar className="list_avatar_Comment2" alt={''} src=''/>
                                  <b className="ReplyNickname">
                                      {reply.unickname}:
                                  </b>
                                  &nbsp;
                                  <pre className="preReplyRhcontent">{reply.rhcontent}</pre>
                                  <br/>
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
      <p className="NoComments">댓글이 없습니다.</p>
  )}
</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={3000} // 3초 후 자동으로 사라집니다.
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{
                        width: '100%',
                        '& .MuiAlert-action': {
                            alignItems: 'center', // 아이콘을 세로 가운데 정렬합니다.
                        },
                    }}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleSnackbarClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    URL이 복사되었습니다!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default HugiRowList;
