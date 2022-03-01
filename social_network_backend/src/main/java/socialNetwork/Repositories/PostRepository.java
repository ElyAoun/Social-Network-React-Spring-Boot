package socialNetwork.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import socialNetwork.Models.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	
	@Query(value="SELECT * FROM posts ORDER BY upload_date DESC", nativeQuery=true)
	List<Post> findAllPostsOrderByDate();
	
	@Modifying
	@Query
	(value="UPDATE posts SET number_likes = :nbr_likes WHERE post_id = :id", nativeQuery = true)
	void like(@Param("nbr_likes") int nbr_likes, @Param("id") Long id);
	
	@Modifying
	@Query
	(value="UPDATE posts SET number_likes = :nbr_likes WHERE post_id = :id", nativeQuery = true)
	void unlike(@Param("nbr_likes") int nbr_likes, @Param("id") Long id);
}
