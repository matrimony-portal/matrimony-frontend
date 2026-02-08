let accessToken = null;
let refreshToken = null;

const REFRESH_TOKEN_KEY = "matrimony_rt";

export const tokenManager = {
  getAccessToken: () => accessToken,

  setAccessToken: (token) => {
    accessToken = token;
  },

  clearAccessToken: () => {
    accessToken = null;
  },

  getRefreshToken: () => {
    if (!refreshToken) {
      refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return refreshToken;
  },

  setRefreshToken: (token) => {
    refreshToken = token;
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken: () => {
    refreshToken = null;
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
