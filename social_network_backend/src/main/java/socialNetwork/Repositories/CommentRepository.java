package socialNetwork.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import socialNetwork.Models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
}
