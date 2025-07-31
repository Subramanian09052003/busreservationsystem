package com.register;

import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

 
 import java.sql.*;


@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final ServletRequest Session = null;
	private RequestDispatcher dispatcher;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    	
    	String username = request.getParameter("username");
        String password = request.getParameter("password");
        HttpSession session=request.getSession();
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection( "jdbc:mysql://localhost:3306/swiftbus", "root", "Ashwin@05");
            String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            ps.setString(2, password);
            
            ResultSet rs = ps.executeQuery();
            
            if(rs.next()) {
            	
            	session.setAttribute("name", rs.getString("username"));
            //	dispatcher=request.getRequestDispatcher("book.html");
            	response.sendRedirect("book.html");
            	
            }else {
            	request.setAttribute("status","falied");
            	//dispatcher=request.getRequestDispatcher("login.html");
            	response.sendRedirect("login.html");

            }
//dispatcher.forward(request, response);

        } catch(Exception e) {
        	e.printStackTrace();
        	
        }
        
    	
    	
    	
    	
    	
    	
    }
     }