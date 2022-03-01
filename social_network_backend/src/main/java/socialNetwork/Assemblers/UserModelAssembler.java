package socialNetwork.Assemblers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import socialNetwork.Controllers.UserController;
import socialNetwork.Models.User;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class UserModelAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {
	@Override
	public EntityModel<User> toModel(User user){
		return EntityModel.of(user,
		linkTo(methodOn(UserController.class).getUser(user.getId())).withSelfRel(),
		linkTo(methodOn(UserController.class).getAllUsers()).withRel("users"));

	}
}
