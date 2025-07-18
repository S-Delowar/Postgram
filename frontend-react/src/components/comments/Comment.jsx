import { MoreOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Card, Dropdown, Image } from "react-bootstrap";
import { format } from "timeago.js";
import { getUser } from "../../hooks/user.actions";
import { randomAvatar } from "../../helper/utils";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";
import UpdateComment from "./UpdateComment";

const Comment = (props) => {
  const { comment, refresh } = props;
  const user = getUser();

  const { setToaster } = useContext(Context);

  const handleDelete =()=>{
    axiosService.delete(`/comments/${comment.id}/`)
    .then(()=>{
        setToaster({show:true, type:"danger", title: "Success", message: "Comment deleted"})
        refresh();
    })
  }

  return (
    <div>
      <Card className="my-4 shadow-sm rounded-3">
        <Card.Body>
          {/* Post Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <Image
                src={randomAvatar()}
                width={48}
                height={48}
                roundedCircle
                className="me-3"
              />
              <div>
                <h6 className="mb-0">{comment.author_username}</h6>
                <small className="text-muted">{format(comment.created)}</small>
              </div>
            </div>

            {user.username == comment.author_username && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn">
                  <MoreOutlined style={{ fontSize: "20px" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* //Modify Post */}
                  <UpdateComment comment={comment} refresh={refresh}/>
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {/* Post Body */}
          <Card.Text className="fs-6">{comment.body}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
