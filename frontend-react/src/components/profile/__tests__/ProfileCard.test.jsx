import { render, screen } from "../../../helper/test-utils";
import TestRenderer from "react-test-renderer";
import ProfileCard from "../ProfileCard";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";

const userData = {
  id: "0590cd67-eacd-4299-8413-605bd547ea17",
  first_name: "Mossie",
  last_name: "Murphy",
  post_count: 3,
  email: "Mossie@yopmail.com",
  username: "MossieMurphy",
  avatar: null,
  created: "2022-08-19T17:31:03.310Z",
  updated: "2022-08-20T07:38:47.631Z",
};

test("Render ProfileCard component", () => {
  render(<ProfileCard profileUser={userData} />);

  const profileCard = screen.getByTestId("profile-card");
  expect(profileCard).toBeInTheDocument();

  const nameElement = screen.getByText(userData.username);
  expect(nameElement).toBeInTheDocument();
});

test("Profile Card snapshot", () => {
  const profileCardDomTree = TestRenderer.create(
    <BrowserRouter>
      <ProfileCard user={userData} />
    </BrowserRouter>
  ).toJSON();
  expect(profileCardDomTree).toMatchSnapshot();
});