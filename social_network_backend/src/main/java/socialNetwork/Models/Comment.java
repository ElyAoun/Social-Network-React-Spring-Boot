package socialNetwork.Models;

import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="comments")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long comment_id; 
	
	@NotNull
	private Date comment_date;
	
	@NotNull
	@Size(min = 3, message = "A Comment should have at least 3 characters")
	private String comment_text;
	
	@ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
	
	@ManyToOne  
	@JoinColumn(name="post_id", referencedColumnName= "post_id")
	private Post post;  
	
	Comment(){}

	public long getComment_id() {
		return comment_id;
	}

	public void setComment_id(long comment_id) {
		this.comment_id = comment_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public void setPost(Post post) {
		this.post = post;
	}

	public Date getComment_date() {
		return comment_date;
	}

	public void setComment_date(Date comment_date) {
		this.comment_date = comment_date;
	}

	public String getComment_text() {
		return comment_text;
	}

	public void setComment_text(String comment_text) {
		this.comment_text = comment_text;
	}
	
	
}
