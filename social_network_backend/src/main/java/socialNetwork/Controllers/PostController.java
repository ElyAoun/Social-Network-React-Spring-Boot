package socialNetwork.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.*;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import socialNetwork.Assemblers.PostModelAssembler;
import socialNetwork.Exceptions.*;
import socialNetwork.Models.Post;
import socialNetwork.Models.User;
import socialNetwork.Repositories.PostRepository;
import socialNetwork.Repositories.UserRepository;


@RestController
public class PostController {
	
	
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostModelAssembler postAssembler;
		
	
	//Upload Post Request
	@PostMapping("/api/posts")
    ResponseEntity<?> createPost(@RequestBody Post post, HttpServletRequest request) {
        
        String logged_user_email = (String) request.getSession().getAttribute("LOGGED_USER");
		
		User logged_user = userRepository.getUserByEmail(logged_user_email);
		
		post.setUser(logged_user);
        
		EntityModel<Post> entityModel = postAssembler.toModel(postRepository.save(post));
         
        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
				.body(entityModel);
    }
	
	
	//Get All Posts Request
	@GetMapping("/api/posts")
	public List<EntityModel<Post>> getAllPosts(){
		List<EntityModel<Post>> postsList = this.postRepository.findAllPostsOrderByDate().stream()
				.map(this.postAssembler::toModel)
				.collect(Collectors.toList());
		
		return postsList;
	}

	
	//Get Single Post By Id Request
	@GetMapping("/api/posts/{id}")
	public EntityModel<Post> getPost(@PathVariable Long id) {
		Post post = postRepository.findById(id).orElseThrow(()->new PostNotFoundException(id));
		return this.postAssembler.toModel(post);
	}
	
	
	//Like Post Request
	@Transactional
	@PutMapping("api/posts/{id}/like")
	public Map<String, Integer> like_post(@PathVariable Long id){
		Post post = postRepository.findById(id).orElseThrow(()->new PostNotFoundException(id));
		postRepository.like(post.getNumber_likes()+1, id);
		HashMap<String, Integer> map = new HashMap<>();
	    map.put("likes", post.getNumber_likes()+1);
	    return map;
	}
	
	//Unlike Post Request
	@Transactional
	@PutMapping("api/posts/{id}/unlike")
	public Map<String, Integer> unlike_post(@PathVariable Long id){
		Post post = postRepository.findById(id).orElseThrow(()->new PostNotFoundException(id));
		postRepository.like(post.getNumber_likes() - 1, id);
		HashMap<String, Integer> map = new HashMap<>();
	    map.put("likes", post.getNumber_likes()-1);
	    return map;
	}
	
	//Delete Post Request
	@DeleteMapping("/api/posts/{id}")
	 public void deletePost(@PathVariable Long id) {
	     postRepository.deleteById(id);
	 }
}
