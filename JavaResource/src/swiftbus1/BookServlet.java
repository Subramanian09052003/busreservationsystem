package com.register;

import java.io.*;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.sql.*;

@WebServlet("/bookTicket")
public class BookServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        String username = (session != null) ? (String) session.getAttribute("name") : null;

        if (username == null) {
            response.sendRedirect("login.html");
            return;
        }

        String source = request.getParameter("source");
        String destination = request.getParameter("destination");
        String busType = request.getParameter("busType");
        String busName = request.getParameter("busName");
        String busCategory = request.getParameter("busCategory");
        String travelDate = request.getParameter("sourceDate");
        String pickupTime = request.getParameter("pickupTime");
        String seats = request.getParameter("seats");
        String ticketPrice = request.getParameter("ticketPrice");

        Connection conn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/swiftbus", "root", "Ashwin@05");

            String sql = "INSERT INTO bookings (username, source, destination, bus_type, bus_name, bus_category, travel_date, pickup_time, seats, ticket_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, username);
            ps.setString(2, source);
            ps.setString(3, destination);
            ps.setString(4, busType);
            ps.setString(5, busName);
            ps.setString(6, busCategory);
            ps.setString(7, travelDate);
            ps.setString(8, pickupTime);
            ps.setString(9, seats);
            ps.setDouble(10, Double.parseDouble(ticketPrice));

            ps.executeUpdate();
            conn.close();

            // Redirect back without message
            response.sendRedirect("book.html");

        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("book.html");
        }
    }
}
