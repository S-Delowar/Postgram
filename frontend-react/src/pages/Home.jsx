import React, { useState } from "react";
import { Context } from "../App";
import LogoutButton from "../buttons/LogoutButton";
import NavigationBar from "../components/NavigationBar";
import Layout from "../components/Layout";
import CreatePost from "../components/post/CreatePost";
import { Col, Image, Row } from "react-bootstrap";
import { randomAvatar } from "../helper/utils";
import { getUser } from "../hooks/user.actions";
import useSWR from "swr";
import { fetcher } from "../helper/axios";
import Post from "../components/post/Post";
import Toaster from "../components/Toaster";

const Home = () => {
    // Toast
  // const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR("/post/", fetcher, {
    refreshInterval: 10000,
  });
  console.log(posts);

  const user = getUser();

  if (!user) {
    return <div>Loading!</div>;
  }

//   Handle toast state
  // const showToast = (message, type = "success") => {
  //   setToast({ show: true, message, type });
  // };

  return (
    <div>
      <Layout>
        <Row className="justify-content-evenly">
          <Col sm={7}>
            <Row className="align-items-center border rounded">
              <Col className="flex-shrink-1">
                <Image
                  src={randomAvatar()}
                  roundedCircle
                  width={52}
                  height={52}
                  className="my-2"
                />
              </Col>
              <Col sm={10} className="flex-grow-1">
                <CreatePost refresh={mutate}/>
              </Col>
            </Row>
            <Row>
              {posts?.results?.map((p) => (
                <Post key={p.id} post={p} refresh={mutate}></Post>
              ))}
            </Row>
          </Col>
          <Col>
            <p>Profiles</p>
          </Col>
        </Row>
        {/* <Toaster
          title="Success!"
          message={toast.message}
          type={toast.type}
          showToast={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        /> */}
      </Layout>
    </div>
  );
};

export default Home;
