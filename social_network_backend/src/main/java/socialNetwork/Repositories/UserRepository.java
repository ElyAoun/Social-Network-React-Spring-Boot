package socialNetwork.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import socialNetwork.Models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query
	(value="SELECT * FROM users WHERE email= :email ", nativeQuery = true)
	User getUserByEmail(@Param("email") String email);
		
	@Query
	(value="SELECT * FROM users WHERE email = :email AND password = :password ", nativeQuery = true)
	User getUser(@Param("email") String email, @Param("password") String password);
}