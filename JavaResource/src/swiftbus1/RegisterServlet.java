package com.register;

import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.sql.*;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String fullname = request.getParameter("fullname");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        RequestDispatcher dispatcher=null;
        Connection conn =null;

        

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn  = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/swiftbus", "root", "Ashwin@05");

            String sql = "INSERT INTO users (fullname, email, phone, username, password) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, fullname);
            ps.setString(2, email);
            ps.setString(3, phone);
            ps.setString(4, username);
            ps.setString(5, password);

            int result = ps.executeUpdate();
           // dispatcher=request.getRequestDispatcher("register.html");
            response.sendRedirect("register.html");
            

            if (result > 0) {
                request.setAttribute  ("status","success"); 
                response.sendRedirect("register.html");

// ✅ Just prints "success"
            } else {
            	 request.setAttribute  ("status","failed ");  
                 response.sendRedirect("register.html");
// ❌ Just prints "failed"
            }
            dispatcher.forward(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
        	try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
    }
}
