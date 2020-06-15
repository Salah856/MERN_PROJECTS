/*
 * File: fake-backend.js
 * Project: user-management
 * File Created: Friday, 7th June 2019 10:23:56 pm
 * Author: Matthew A. Raymer (matthew.raymer@anomalistdesign.com)
 * -----
 * Last Modified: Friday, 7th June 2019 10:27:07 pm
 * Modified By: Matthew A. Raymer (matthew.raymer@anomalistdesign.com>)
 * -----
 * Copyright 2019, ADDLC
 */

export function setMockBackend() {
  let users = [
    {
      id: 1,
      email: "test",
      password: "test",
      fullname: "Test",
      role: "user",
      emailVerified: true
    }
  ];
  let realFetch = window.fetch;
  window.fetch = (url, opts) => {

    return new Promise((resolve) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate - public
        if (url.endsWith("/auth/login") && opts.method === "POST") {
          const params = JSON.parse(opts.body);
          const user = users.find(
            x => x.email === params.email && x.password === params.password
          );
          if (!user) return error("Login Failed!");
          return ok({
            success: true,
            data: user,
            message: "Login Success!"
          });
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));

        // private helper functions

        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body))
          });
        }

        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message }))
          });
        }
      }, 500);
    });
  };
}
