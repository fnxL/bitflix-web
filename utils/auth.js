import axios from '../query/serverAxiosInstance';

export const login = async (data) => {
  try {
    const { data: response } = await axios.post('/auth/login', data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyUser = async (token) => {
  try {
    const { data: response } = await axios.get(`/auth/verify?token=${token}`);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const signUp = async (data) => {
  try {
    const { data: response } = await axios.post('/auth/signup', data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const logOut = async () => {
  try {
    const { data: response } = await axios.post('/auth/logout');
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getInviteKeys = async () => {
  try {
    const { data: response } = await axios.get('/auth/invitekeys');
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const generateKeys = async () => {
  try {
    const { data: response } = await axios.get('/auth/generatekey');
    return response;
  } catch (error) {
    return error.response;
  }
};
