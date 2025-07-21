import React from "react";
import LogoutButton from "../buttons/LogoutButton";
import NavigationBar from "../components/NavigationBar";
import Layout from "../components/Layout";
import CreatePost from "../components/post/CreatePost";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import { randomAvatar } from "../helper/utils";
import { getUser } from "../hooks/user.actions";
import useSWR from "swr";
import { fetcher } from "../helper/axios";
import Post from "../components/post/Post";
import Toaster from "../components/Toaster";
import ProfileCard from "../components/profile/ProfileCard";
import { getAvatarURL } from "../helper/avatar";
import { useLoggedInUserSWR } from "../helper/getUser";

const Home = () => {
  const { data: posts, mutate } = useSWR("/post/", fetcher, {
    refreshInterval: 10000,
  });

  const profiles = useSWR("/user/?limit=5", fetcher);

  console.log(posts);
  console.log("featured profiles: ", profiles.data?.results);

  const { loggedInUser, isLoading, isError} = useLoggedInUserSWR();


  if (isLoading) {
    return (
      <>
      <div>Loading!</div>
      <Spinner></Spinner></>
    );
  }
  if (isError){
    return (
      <>
      <h5>Error! Page not Loading.</h5>
      </>
    )
  }

  return (
    <div>
      <Layout>
        <Row className="justify-content-evenly">
          <Col sm={7}>
            <Row className="align-items-center border rounded">
              <Col className="flex-shrink-1">
                <Image
                  src={getAvatarURL(loggedInUser.avatar) || randomAvatar()}
                  roundedCircle
                  width={52}
                  height={52}
                  className="my-2"
                />
              </Col>
              <Col sm={10} className="flex-grow-1">
                <CreatePost refresh={mutate} />
              </Col>
            </Row>
            <Row>
              {posts?.results?.map((p) => (
                <Post key={p.id} post={p} refresh={mutate}></Post>
              ))}
            </Row>
          </Col>
          <Col
            sm={3}
            className="border rounded py-4
           h-50"
          >
            <h4 className="font-weight-bold text-center">Suggested people</h4>
            {profiles?.data?.results?.map(
              (profileUser) =>
                profileUser.username !== loggedInUser.username && (
                  <ProfileCard key={profileUser.id} profileUser={profileUser} />
                )
            )}
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
