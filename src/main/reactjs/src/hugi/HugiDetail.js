import React, {useEffect, useState} from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
import {useNavigate, useParams} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import {FavoriteBorder, FavoriteSharp} from "@mui/icons-material";
import ListIcon from '@mui/icons-material/List';
import EditIcon from "@mui/icons-material/Edit";
import Profile from "../image/user60.png";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function HugiDetail(props) {
    const { hnum } = useParams(); // URL 매개변수를 가져옵니다.
    const url = process.env.REACT_APP_HUGI;
    const url2=process.env.REACT_APP_HUGI2;
    const url3= process.env.REACT_APP_HUGI_325;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;

    const apiURL = 'http://localhost:9009/hugi/shortenUrl'; // 스프링 백엔드의 컨트롤러 URL
    const navi = useNavigate();

    const [openReplyForm, setOpenReplyForm] = useState(null);
    const [showLike, setShowLike] = useState(props.showLike || false);
    const [unum, setUnum] = useState('');
    const [uphoto,setUphoto]=useState('');
    const [userNum,setUserNum]=useState('');
    const [rhnum, setRhnum] = useState(null);
    const [rhcontent, setRhcontent] = useState('');
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [commentError, setCommentError] = useState(false); // 댓글 입력 오류 여부 상태 추가
    const [replyError, setReplyError] = useState(false); // 대댓글 입력 오류 여부 상태 추가
    const [errorCommentId, setErrorCommentId] = useState(null); // 오류가 발생한 대댓글의 ID 상태 추가
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [postUserNickname, setPostUserNickname] = useState('');
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [hwriteday,setHwriteday]=useState('');
    const [hlike,setHlike]=useState('');
    const [shortenedURL, setShortenedURL] = useState('');


    const handleClickList = () =>{
        navi('/hugi/list');
    }
    const handleClickModify = () =>{
        navi(`/hugi/modify/${hnum}`);
    }
    const handleClickAvatar  = (funum) =>{
        if (unum === 0) {
            alert('로그인을 먼저 해주세요!');
        } else {
            navi(`/friend/detail/${funum}`);
        }
    };

    const generateShortURL  = (longUrl) => {

        const client_id = '8cvbhm3fzt'; // 본인의 클라이언트 아이디값
        const client_secret = 'j1cXNz7BdAeQ7SFB6H8HoKzSqkvLOIgkqYMs3a3N'; // 본인의 클라이언트 시크릿값
        // const longUrl = 'http://devster.kr/'; // 짧게 만들고 싶은 URL 입력칸입니다!!! (젠킨스주소 넣어보기)

        const requestData = {
            url: longUrl, // 서버에서 단축시킬 URL 대신에 목록 URL을 보냄
            client_id: client_id,
            client_secret: client_secret,
        };

        Axios.post(apiURL, requestData)
            .then((res) => {
                const generatedURL = res.data.result.url; // 단축된 URL 값
                setShortenedURL(generatedURL);
                shareShortenedURL(generatedURL); // 단축 URL을 생성하고 나서 SNS 공유 함수 호출
                copyToClipboard(generatedURL); // 클립보드에 복사
            })
            .catch((error) => {
                // console.error('Error generating shortened URL:', error);
            });
    };

    // SNS 공유 함수
    const shareShortenedURL = (url) => {
        if (navigator.share) {
            navigator.share({
                title: '버디버디',
                text:'버디버디 라운딩 후기입니다.',
                url: url,
            })
                .then(() => {
                    console.log('URL 공유 성공!');
                    setSnackbarOpen(true); // URL이 복사되면 Snackbar를 엽니다.
                })
                .catch((error) => {
                    // console.error('URL 공유 중 오류 발생:', error);
                });
        } else {
            // navigator.share() API를 지원하지 않는 브라우저를 위한 대체 방법
            // 메시지를 사용자에게 보여주거나 다른 접근 방식을 사용할 수 있습니다.
            alert('이 링크를 공유하세요: ' + url);
            // copyToClipboard(url);// 클립보드에 복사하는 함수 호출
        }
    };
    const copyToClipboard = (text) => {
        // Clipboard API를 사용하여 클립보드에 복사
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('URL 복사 완료!!:', text);
                setSnackbarOpen(true); // URL이 복사되면 Snackbar를 엽니다.
            })
            .catch((error) => {
                // console.error('클립보드 복사 중 오류 발생:', error);
            });
    };
    // 클릭 이벤트 핸들러
    const handleClickShare = () => {
        const longUrl = `http://223.130.137.128/hugi/detail/${hnum}`; // 단축시킬 원본 URL 입력 ,hnum도 잘 받아옴
        generateShortURL(longUrl);
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    // Snackbar 표시를 위한 useEffect
    useEffect(() => {
        if (snackbarOpen) {
            // TODO: Snackbar를 표시하는 로직을 구현합니다.
            // 예를 들어, Material-UI의 Snackbar 컴포넌트를 사용하여 표시할 수 있습니다.
            //setSnackbarOpen(false); // Snackbar를 표시하고 나서 상태를 다시 false로 변경
        }
    }, [snackbarOpen]);
    const unumchk=()=>{
        Axios.get("/login/unumChk")
            .then(res=> {
                setUnum(res.data);
            });
    }
    useEffect(() => {
        unumchk()
    }, [])

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
                // console.log('좋아요 처리 중 오류가 발생했습니다.', error);
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
                // console.log('좋아요 취소 처리 중 오류가 발생했습니다.', error);
            });
    };
    const handleClickDelete = () => {
        if (parseInt(unum) === parseInt(userNum)) {
            const confirmed = window.confirm('정말 삭제하시겠습니까?');
            if (confirmed) {
                deleteAllComments()
                    .then(() => {
                        Axios.delete(`/hugi/delete/${hnum}`)
                            .then(() => {
                                console.log('게시물이 성공적으로 삭제되었습니다.');
                                navi("/hugi/list");
                            })
                            .catch((error) => {
                                // console.log('게시물 삭제 중 오류가 발생했습니다.', error);
                            });
                    })
                    .catch((error) => {
                        // console.log('댓글과 답글 삭제 중 오류가 발생했습니다.', error);
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
                    // console.log('댓글과 답글 삭제 중 오류가 발생했습니다.', error);
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
                // console.log('댓글 삭제 중 오류가 발생함', error);
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
                setComments(sortedComments);
                res.data.forEach((comment) => {
                    fetchCommentUserPhoto(comment.unum, comment); // 댓글 작성자의 프로필 사진 정보 가져오기
                    if (comment.comments) {
                        comment.comments.forEach((reply) => {
                            fetchReplyUserPhoto(reply.unum, reply); // 대댓글 작성자의 프로필 사진 정보 가져오기
                        });
                    }
                });
            })
            .catch((error) => {
                // console.log(error);
            });
    };
    const fetchPostUserNickname = async (unum) => {
        if (unum) {
            try {
                const res = await Axios.get(`/hugi/getUser/${unum}`);
                const Unickname = res.data;
                if (Unickname) {
                    setPostUserNickname(Unickname);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // 404 오류 처리
                } else {
                 // console.log('오류가 발생했습니다.', error.message);
                }
            }
        }
    };
    const fetchUserPhoto = (unum) => {
        Axios.get(`/hugi/getUserPhoto/${unum}`)
            .then((res) => {
                const userPhoto = res.data;
                setUphoto(userPhoto);
            })
            .catch((error) => {
               // console.log('Error fetching user photo:', error);
            });
    };
    useEffect(() => {
        if (unum === '') {
            fetchUserPhoto(unum);
        }
    }, [uphoto,unum]);
    // 댓글 작성자의 프로필 사진 정보를 가져오는 함수
    const fetchCommentUserPhoto = (unum, comment) => {
        Axios.get(`/hugi/getUserPhoto/${unum}`)
            .then((res) => {
                const userPhoto = res.data;
                // comment 객체에 댓글 작성자의 프로필 사진 정보 추가
                comment.uphoto = userPhoto;
                // state 업데이트 등의 작업을 수행할 수 있습니다.
                setComments((prevComments) => [...prevComments]); // 댓글 정보가 추가된 새로운 배열로 state 업데이트
            })
            .catch((error) => {
               // console.log('Error fetching comment user photo:', error);
            });
    };

// 대댓글 작성자의 프로필 사진 정보를 가져오는 함수
    const fetchReplyUserPhoto = (unum,reply) => {
        Axios.get(`/hugi/getUserPhoto/${unum}`)
            .then((res) => {
                const userPhoto = res.data;
                // reply 객체에 대댓글 작성자의 프로필 사진 정보 추가
                reply.uphoto = userPhoto;
                // state 업데이트 등의 작업을 수행할 수 있습니다.
                setComments((prevComments) => [...prevComments]); // 대댓글 정보가 추가된 새로운 배열로 state 업데이트
            })
            .catch((error) => {
                //console.log('Error fetching reply user photo:', error);
            });
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
            const res = await Axios.get(`/hugi/getUser/${unum}`);
            const userNickname = res.data;
            if (userNickname) {
                const newComment = {
                    rhnum: rhnum,
                    hnum: hnum,
                    unum: unum,
                    uphoto:uphoto,
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
            // console.log('오류가 발생했습니다.', error.message);
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
            uphoto:uphoto,
            rhcontent: replyContent,
            ref: comment.rhnum,
            step: comment.step + 1,
            depth: comment.depth + 1,
        };

        Axios.post("/rehugi/newreply?unum=" + unum, newReply)
            .then((res) => {
                console.log('댓글이 성공적으로 추가되었습니다.');
                getComments();
                toggleReplyForm(comment.rhnum);
                setReplyError(false);
                setErrorCommentId(null);
            })
            .catch((error) => {
                // console.log('댓글 추가 중 오류가 발생했습니다.', error);
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
        // 서버로부터 hnum에 해당하는 데이터를 가져와서 상태에 저장합니다.
        Axios.get(`/hugi/detail/${hnum}`)
            .then((res) => {
                setPostUserNickname(res.data.unickname);
                setUphoto(res.data.uphoto);
                setHwriteday(res.data.hwriteday);
                setHphoto(res.data.hphoto);
                setHcontent(res.data.hcontent);
                setUserNum(res.data.unum);
                // 서버에서 가져온 다른 데이터도 필요한 경우 여기에 추가적으로 설정합니다.
            })
            .catch((error) => {
                // console.log(error);
            });
    }, [hnum]);

    useEffect(() => {
        getComments();
    }, [hnum, unum]);

    useEffect(() => {
        // fetchPostUserNickname 함수를 사용하여 postUserNickname 상태를 설정합니다.
        fetchPostUserNickname(props.unum);
    }, [props.unum]);

    useEffect(() => {
        // 페이지가 로드될 때 localStorage에서 좋아요 상태를 불러와서 적용
        const likeStatus = localStorage.getItem(`likeStatus_${hnum}`);
        setShowLike(likeStatus === "true");
    }, [hnum]); // hnum이 변경될 때마다 실행


    return (
        <div>
        <Header/>
        <div className="HG_list_detail">
            <div className="HG_list_header">
                {uphoto == null ? (
                    <Avatar className="HG_list_avatar" alt={''}  src={Profile} onClick={handleClickAvatar.bind(null,userNum)}/>
                ):(
                    <Avatar className="HG_list_avatar" alt={''} src={`${image1}${uphoto}${image2}`} onClick={handleClickAvatar.bind(null,userNum)}/>
                )}
                <span className="HG_spanName" onClick={handleClickAvatar.bind(null,userNum)}>{postUserNickname}</span>
            </div>
            &nbsp;
            <span className="HG_spanWriteday">{hwriteday}</span>
            <div style={{textAlign:"center"}}>
            <img className="HG_list_detailimage" src={`${url2}${hphoto}${url3}`} alt="" value={hphoto}/>
            </div>
            <h6 className="HG_list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div className="HG_IconsZone">
                {unumchk && parseInt(unum)!== 0 &&
                    (showLike ? (
                    <FavoriteSharp onClick={handleClickLikeOff} className="HG_Icons" style={{color: "red"}}/>
                ) : (
                    <FavoriteBorder onClick={handleClickLikeOn} className="HG_Icons" style={{color: "red"}}/>
                ))}
                <ShareIcon onClick={handleClickShare} className="HG_Icons"/>
                {unum === userNum && (
                    <EditIcon onClick={handleClickModify} className="HG_Icons"/>
                )}
                {unum === userNum  && (
                    <DeleteIcon onClick={handleClickDelete} className="HG_Icons"/>
                )}
                <ListIcon onClick={handleClickList} className="HG_Icons"/>

            </div>

            {unumchk && parseInt(unum) !== 0 && (
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
                    <button type="button" className="HG_button_Comment" onClick={handleCommentSubmit}>
                        댓글 작성
                    </button>
                </div>
            )}

            {commentError && (
                <div>
                    <p className="HG_CommentAlert">댓글을 입력해주세요.</p>
                </div>
            )}
            <pre className="HG_preComment">
  {comments && comments.length > 0 ? (
      comments.map((comment) => (
          <div key={comment.rhnum} style={{overflowX: 'hidden'}}>
              <div className="HG_Comments">
                  <span className="HG_Commentname" onClick={handleClickAvatar.bind(null,comment.unum)}>{comment.unickname}</span>
                  {comment.uphoto == null ? (
                      <Avatar className="HG_list_avatar_Comment2" alt={''} src={Profile} onClick={handleClickAvatar.bind(null,comment.unum)}/>
                  ):(
                      <Avatar className="HG_list_avatar_Comment2" alt={''} src={`${image1}${comment.uphoto}${image2}`}  onClick={handleClickAvatar.bind(null,comment.unum)}/>
                  )}
                  <pre className="HG_detail_preRhcontent">{comment.rhcontent}</pre>
                  <br/>
                  <span className="HG_spanRhwriteday">{comment.rhwriteday}</span>
                  {unumchk && parseInt(unum) !== 0 && (
                      <a className="HG_Click_ReplyForm" onClick={() => toggleReplyForm(comment.rhnum)}>
                          {openReplyForm === comment.rhnum ? '닫기' : '댓글'}
                      </a>
                  )}
                  {parseInt(comment.unum) === parseInt(unum) && (
                      <DeleteIcon
                          className="HG_Delete_Icon"
                          onClick={() => handleClickDeleteComment(comment.rhnum)}
                      />
                  )}
              </div>
              {openReplyForm === comment.rhnum && unum && (
                  <div className="input-group" style={{width:"320px",marginLeft:"10px"}}>
            <textarea
                className="form-control"
                style={{
                    width: '67%',
                    height: '40px',
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
                          className="HG_button_Reply"
                          onClick={() => submitReply(comment)}
                      >
                          대댓글 작성
                      </button>
                  </div>
              )}
              {replyError && comment.rhnum === errorCommentId && (
                  <div>
                      <p className="HG_ReplyAlert">대댓글을 입력해주세요.</p>
                  </div>
              )}
              {comment.comments && comment.comments.length > 0 && (
                  <details className="HG_detail_details_Reply">
                      <summary>댓글보기</summary>
                      {comment.comments &&
                          comment.comments.map((reply) => (
                              <div key={reply.rhnum} className="HG_Comment_Reply_List">
                                  {reply.uphoto == null ? (
                                      <Avatar className="HG_list_avatar_Comment2" alt={''} src={Profile} onClick={handleClickAvatar.bind(null,reply.unum)}/>
                                  ):(
                                      <Avatar className="HG_list_avatar_Comment2" alt={''} src={`${image1}${reply.uphoto}${image2}`}  onClick={handleClickAvatar.bind(null,reply.unum)}/>
                                  )}
                                  <b className="HG_detail_ReplyNickname" onClick={handleClickAvatar.bind(null,reply.unum)}>
                                      {reply.unickname}
                                  </b>
                                  &nbsp;
                                  <pre className="HG_detail_preReplyRhcontent">{reply.rhcontent}</pre>
                                  <br/>
                                  <span className="HG_detail_spanReplyRhwriteday">{reply.rhwriteday}</span>
                                  {parseInt(reply.unum) === parseInt(unum) && (
                                      <DeleteIcon
                                          className="HG_detail_Delete_Icon"
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
      <p className="HG_NoComments">댓글이 없습니다.</p>
  )}
</pre>
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
        </div>
    );
}

export default HugiDetail;
