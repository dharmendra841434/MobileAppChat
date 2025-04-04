import axiosInstance from './axiosInstance';

// Function to fetch all users data
export const loginRequest = async payload => {
  const response = await axiosInstance.post(`/auth/login`, payload, {
    withCredentials: true,
  });
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const getAllGroups = async () => {
  const response = await axiosInstance.get(`/group/all`);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const getUserDetails = async () => {
  const response = await axiosInstance.get(`/auth/user-details`);
  return response.data || response; // Assuming the response contains the data
};

// Function to create a new group
export const createGroupRequest = async payload => {
  const response = await axiosInstance.post(`/group/create`, payload);
  return response.data || response; // Assuming the response contains the data
};
// Function to join a group
export const joinGroupRequest = async payload => {
  const response = await axiosInstance.post(`/group/join`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch register users
export const registerRequest = async payload => {
  const response = await axiosInstance.post(`/auth/register`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const checkUsernameRequest = async payload => {
  const response = await axiosInstance.post(`/auth/check-usernames`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const getUserProfile = async username => {
  const response = await axiosInstance.get(
    `/auth/findByUsername?username=${username}`,
  );
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const findPeoplesRequest = async query => {
  const response = await axiosInstance.get(`/auth/search?query=${query}`);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const sendFriendRequest = async payload => {
  const response = await axiosInstance.post(`/auth/send-request`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const cancelSendFriendRequest = async payload => {
  const response = await axiosInstance.post(
    `/auth/cancel-sended-request`,
    payload,
  );
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const acceptFriendRequest = async payload => {
  const response = await axiosInstance.post(`/auth/accept-request`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const cancelRecivedFriendRequest = async payload => {
  const response = await axiosInstance.post(
    `/auth/cancel-recieved-request`,
    payload,
  );
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const getPeoplesChats = async query => {
  const response = await axiosInstance.get(`/chat/friends-chat`);
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const sendNotifications = async payload => {
  const response = await axiosInstance.post(`/send-notification`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to mark all messages as read
export const markAllReadMsg = async payload => {
  const response = await axiosInstance.put(
    `/group/mark-all-messages-read`,
    payload,
  );
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const markasAllReadChatMsg = async payload => {
  // console.log(payload, "khjgg");
  const response = await axiosInstance.put(`/chat/mark-as-read`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to delete a group
export const deleteGroupRequest = async groupKey => {
  const response = await axiosInstance.post(`/group/delete-group`, {
    groupKey: groupKey,
  });
  return response.data || response; // Assuming the response contains the data
};
