import React from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
function HugiRowList(props) {
    const {uname, hcontent, hphoto,hwriteday} = props;
    // const url = process.env.REACT_APP_BOARDURL;
    const navi=useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

            {/*<img className="list_image" src={`${url}${hphoto}`} alt="" />*/}
            <img className="list_image" src={process.env.PUBLIC_URL +`${hphoto}`} alt="" />
            <h6 className="list_text">
                &nbsp;
                {hcontent}
            </h6>
            <hr/>
            <div style={{width:"25px",marginBottom:"10px",marginLeft:"10px",cursor:"pointer"}}>
                <MessageIcon onClick={handleClickOpen}/>
            </div>

            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{width:"450px",height:"100%",overflowX:"hidden"}}>
                <DialogTitle id="alert-dialog-title" >
                    <Avatar className="list_avatar" alt={uname}
                            src="/static/images/avatar/1.jpg"/>
                    <h5 style={{position:"relative",bottom:"33px",left:"50px"}}>{uname}</h5>
                </DialogTitle>
                <DialogContent style={{width:"100%",overflowX:"hidden"}}>
                            <img src={process.env.PUBLIC_URL +`${hphoto}`} alt="" style={{width:"400px"}}/>

                    <DialogContentText id="alert-dialog-description">
                        <hr/>
                        <div style={{width:"100%"}}>
                        {hcontent}
                        </div>
                    </DialogContentText>
                    <hr/>
                    <div className="input-group">
                    <textarea class="form-control" style={{width:"300px",height:"50px",border:"1px solid gray",borderRadius:"5px"}}
                              placeholder="댓글을 작성 해 보세요"></textarea>
                        <button type="button" className="btn btn-sm btn-outline-success">댓글작성</button>

                    </div>
                    <pre style={{width:'500px',height:'20px'}}>
                        {/*댓글 출력 위치*/}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <div style={{width:'100%',position:"relative",top:"5px",right:"10px"}}>
                    <Button style={{width:'100px'}}onClick={handleClose} autoFocus> 취소</Button>
                    </div>
                    </DialogActions>
                </div>
            </Dialog>

        </div>
    );
}

export default HugiRowList;