import { Cookies } from "react-cookie";

const setAuthTokenCookie = (authToken, userId) => {
  const cookies = new Cookies();
  cookies.set("authToken", authToken, {
    path: "/", // Accessible across the entire site
    maxAge: 3600, // Expires in 1 hour (3600 seconds)
    secure: true, // Ensures cookie is only sent over HTTPS
    sameSite: "Strict" // Prevents cross-site access for improved security
  });
  cookies.set("userId", userId, {
    path: "/", // Accessible across the entire site
    maxAge: 3600, // Expires in 1 hour (3600 seconds)
    secure: true, // Ensures cookie is only sent over HTTPS
    sameSite: "Strict" // Prevents cross-site access for improved security
  });
};

export default setAuthTokenCookie;

/*

Server sets the refresh token in an HttpOnly cookie when login

Make Axios send cookies in its requests automatically by including
header with withCredentials: true // Ensures HttpOnly cookies are sent

If the cookie has the HttpOnly attribute, it cannot be accessed or 
modified by client-side JavaScript (document.cookie).


Cookies, including HttpOnly cookies, are stored client-side within the user's browser. 
The server sends the cookie to the browser through the Set-Cookie header in the HTTP response. 
Once received, the browser automatically handles and stores the cookie, 
adhering to the attributes like HttpOnly, Secure, SameSite, and path.

* Client-Side Storage
The cookie is stored in the user's browser and can be accessed by the server during subsequent HTTP requests.

If the cookie has the HttpOnly attribute, it cannot be accessed or modified by client-side JavaScript (document.cookie).

The browser automatically includes the cookie in all relevant requests to the server, based on the defined domain and path.

* Server-Side Perspective
The server itself does not store the cookie. However, the server:

Generates and sends the cookie to the client.

Reads the cookie from incoming requests for purposes like authentication or session validation or to generate and send the access token.

For example, in a request/response cycle:

The client sends the HttpOnly cookie to the server automatically via the Cookie header in HTTP requests.

The server retrieves and validates the cookie to determine the user's authentication state or perform relevant actions.

Summary
While the cookie is physically stored on the client-side (in the browser), it is securely managed through server-side logic. 
This approach ensures that sensitive cookies like HttpOnly refresh tokens are inaccessible 
to malicious scripts while remaining functional for secure server-client workflows.
*/