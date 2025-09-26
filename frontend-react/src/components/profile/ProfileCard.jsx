import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { randomAvatar } from "../../helper/utils";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  const { profileUser } = props;
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    //navigate to profile details page
    navigate(`/user/${profileUser.id}/`);
  };

  if (!profileUser) {
    return null;
  }

  console.log("Profile Card user: ", profileUser);

  return (
    <>
      <Card className="border-0 p-2" data-testid="profile-card">
        <div className="d-flex">
          <Image
            src={profileUser.avatar? profileUser.avatar : randomAvatar()}
            roundedCircle
            width={48}
            height={48}
            className="my-3 border border-primary border-2"
          />
          <Card.Body>
            <Card.Title>{profileUser.username}</Card.Title>
            <Button
              className=""
              variant="primary"
              onClick={handleNavigateToProfile}
            >
              See Profile
            </Button>
          </Card.Body>
        </div>
      </Card>
    </>
  );
};

export default ProfileCard;
