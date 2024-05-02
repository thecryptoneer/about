export const PUBLIC_API_ROUTES = {
  requestMessage: { url: "/api/auth/message/request", method: "GET" },
  signMessage: { url: "/api/auth/message/sign", method: "POST" },
  signIn: { url: "/api/auth/signin", method: "POST" },

  fetchData: { url: "/api/user", method: "GET" },
};

export const baseHeaders = {
  "Content-Type": "application/json",
};

export const authHeaders = (token: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
