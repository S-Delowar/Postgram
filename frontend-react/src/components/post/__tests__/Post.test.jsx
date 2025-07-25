import { render, screen } from "../../../helper/test-utils";
import userFixtures from "../../../helper/fixtures/user";
import postFixtures from "../../../helper/fixtures/post";
import Post from "../Post";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setUserData } from "../../../hooks/user.actions";
import { useLoggedInUserSWR } from "../../../helper/getUser";


vi.mock("../../../helper/getUser.js", ()=>({
    useLoggedInUserSWR: ()=>({
        loggedInUser: {username: "testuser"},
        isLoading: false,
        isError: false,
    })
}));

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

beforeEach(() => {
  localStorage.clear();
  setUserData({
    user: userData,
    access: null,
    refresh: null,
  });
});

describe("<Post />", () => {
  it("renders Post component", () => {
    const providerProps = {
      setToaster: vi.fn(),
    };
    render(<Post post={postData} />, { providerProps });
    const postElement = screen.getByTestId("post-test");
    expect(postElement).toBeInTheDocument();
  });
});
