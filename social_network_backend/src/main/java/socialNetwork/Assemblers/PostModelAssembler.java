package socialNetwork.Assemblers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import socialNetwork.Controllers.PostController;
import socialNetwork.Models.Post;

@Component
public class PostModelAssembler implements RepresentationModelAssembler<Post, EntityModel<Post>>{
	@Override
	public EntityModel<Post> toModel(Post p){
		return EntityModel.of(p,
		linkTo(methodOn(PostController.class).getPost(p.getPost_id())).withSelfRel(),
		linkTo(methodOn(PostController.class).getAllPosts()).withRel("posts"));

	}
}
