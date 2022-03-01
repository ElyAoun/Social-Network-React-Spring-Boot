package socialNetwork.Models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.*;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long user_id;
	
	@NotNull
	@Size(min = 2, message = "The Name should have at least 2 characters")
	private String name;
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	@Size(min = 8, message = "The Password should have at least 8 characters")
	private String password;
	
	@NotNull
	@Size(min = 6, message = "The Phone number should have at least 6 characters")
	private String phone_number;
	
	@NotNull
	private String country_of_origin;
	
	private String profile_image;
	
	
	
	public String getProfile_image() {
		return profile_image;
	}

	public void setProfile_image(String profile_image) {
		this.profile_image = profile_image;
	}

	@OneToMany(fetch = FetchType.LAZY,mappedBy="user",cascade = CascadeType.ALL)
    private Set<Post> post;
	
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy="user",cascade = CascadeType.ALL)
    private Set<Comment> comment;


	User(){}
	
	public long getId() {
		return user_id;
	}
	public void setId(long id) {
		this.user_id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getCountry_of_origin() {
		return country_of_origin;
	}

	public void setCountry_of_origin(String country_of_origin) {
		this.country_of_origin = country_of_origin;
	}
	
	
}
