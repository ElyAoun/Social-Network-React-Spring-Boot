package socialNetwork.Assemblers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import socialNetwork.Controllers.PostController;
import socialNetwork.Models.Comment;

@Component
public class CommentModelAssembler implements RepresentationModelAssembler<Comment, EntityModel<Comment>>{
	@Override
	public EntityModel<Comment> toModel(Comment c){
		return EntityModel.of(c,
		linkTo(methodOn(PostController.class).getPost(c.getComment_id())).withSelfRel());
	}
}
