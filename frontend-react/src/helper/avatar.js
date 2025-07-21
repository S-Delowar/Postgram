 export const randomAvatar = () =>
 `https://i.pravatar.cc/300?img=${Math.floor(Math.
 random() * 60) + 1}`;

export function getAvatarURL(avatarPath) {
  const BASE_URL = "http://localhost:8000";
  return avatarPath ? `${BASE_URL}${avatarPath}` : randomAvatar();
}