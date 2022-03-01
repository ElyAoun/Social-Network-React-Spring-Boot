package socialNetwork.Controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import socialNetwork.Assemblers.CommentModelAssembler;
import socialNetwork.Exceptions.PostNotFoundException;
import socialNetwork.Models.Comment;
import socialNetwork.Models.Post;
import socialNetwork.Models.User;
import socialNetwork.Repositories.CommentRepository;
import socialNetwork.Repositories.PostRepository;
import socialNetwork.Repositories.UserRepository;

@RestController
public class CommentController {
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	CommentRepository commentRepository;
	
	@Autowired 
	UserRepository userRepository;
	
	@Autowired
	CommentModelAssembler commentAssembler;
	
	@PostMapping("/api/posts/{id}/comment")
    ResponseEntity<?> enterComment(@PathVariable Long id, @RequestBody Comment comment, HttpServletRequest request) {
        
        String logged_user_email = (String) request.getSession().getAttribute("LOGGED_USER");
		
		User logged_user = userRepository.getUserByEmail(logged_user_email);
		
		comment.setUser(logged_user);
		
		Post post = postRepository.findById(id).orElseThrow(()->new PostNotFoundException(id));
		
		comment.setPost(post);
		
		
		EntityModel<Comment> entityModel = commentAssembler.toModel(commentRepository.save(comment));
         
        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
				.body(entityModel);
    }
}
