package com.register;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/Logout")
public class LogutServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        HttpSession session = request.getSession(false); // get session if exists
        if (session != null) {
            session.invalidate(); // kill session
        }

        // Redirect back to login page or homepage
        response.sendRedirect("login.html");
    }
}
