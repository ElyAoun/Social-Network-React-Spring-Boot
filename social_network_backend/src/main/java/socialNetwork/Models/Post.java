package socialNetwork.Models;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name="posts")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long post_id;
	
	@NotNull
	private Date upload_date;
	
	@NotNull
	private int number_likes;
	
	@NotNull
	@Size(min = 50, message = "A post should have at least 50 characters")
	private String post_text;
	 
	
	private String image;
	
	@ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
	 
	
	@OneToMany(targetEntity = Comment.class, cascade = CascadeType.ALL)
    @JoinColumn(name ="post_id",referencedColumnName = "post_id")
    private List<Comment> comments;
	
	 
	public Post(){}

	public long getPost_id() {
		return post_id;
	}

	public void setPost_id(long post_id) {
		this.post_id = post_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public List<Comment> getComments(){
		return this.comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Date getUpload_date() {
		return upload_date;
	}

	public void setUpload_date(Date upload_date) {
		this.upload_date = upload_date;
	}

	public int getNumber_likes() {
		return number_likes;
	}

	public void setNumber_likes(int number_likes) {
		this.number_likes = number_likes;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getPost_text() {
		return post_text;
	}

	public void setPost_text(String post_text) {
		this.post_text = post_text;
	}
	 
	 
}
