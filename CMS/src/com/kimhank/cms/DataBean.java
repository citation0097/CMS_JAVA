package com.kimhank.cms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.tomcat.jdbc.pool.DataSource;

public class DataBean {
	
   private static DataBean instance = new DataBean();
	
	public static DataBean getInstance() {
		return instance;
	}
	private DataBean() {};
	
	private Connection getConnection() throws Exception{
		Context initCtx = new InitialContext();
		Context envCtx = (Context)initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource)envCtx.lookup("jdbc/jsptest");
		return ds.getConnection();
	}
	
	public List<StudentBean> selectStudent() {
		int rtn = 0;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<StudentBean> studentList = null;
		try {
			con = getConnection();
			String sql = "SELECT student_id as id , student_name as name  , course, grade FROM student_grade";
			pstmt = con.prepareStatement(sql);
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				studentList = new ArrayList<StudentBean>();
				do {
					StudentBean student = new StudentBean();
					student.setId(rs.getInt("id"));
					student.setName(rs.getString("name"));
					student.setCourse(rs.getString("course"));
					student.setGrade(rs.getInt("grade"));
					studentList.add(student);
				}while(rs.next());
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			if(rs != null) try { rs.close();} catch(SQLException ex) {}
			if(pstmt !=null) try { pstmt.close();} catch(SQLException ex) {}
			if(con != null) try { con.close(); } catch(SQLException ex) {}
		}
		return studentList;
	}
}
