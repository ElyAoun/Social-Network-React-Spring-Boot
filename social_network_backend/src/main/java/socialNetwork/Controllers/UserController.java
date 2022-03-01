package socialNetwork.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import socialNetwork.Assemblers.UserModelAssembler;
import socialNetwork.Exceptions.*;
import socialNetwork.Models.User;
import socialNetwork.Repositories.UserRepository;

import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
public class UserController {
	
	
	private final UserRepository userRepository;
	
	private final UserModelAssembler userAssembler;
	
	public UserController(UserRepository userRepository, UserModelAssembler userAssembler) {
		this.userRepository = userRepository;
		this.userAssembler = userAssembler;
	}
	
	
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	
	//User Register Request
	@PostMapping("/api/signUp")
	EntityModel<User> signUp(@RequestBody User newUser, HttpServletRequest request) {
		
		User user_already_exists = userRepository.getUserByEmail(newUser.getEmail());
		
		if(user_already_exists != null) {
			throw new UserAlreadyExistsException();
		}
		
		newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		EntityModel<User> entityModel = userAssembler.toModel(userRepository.save(newUser));

		return entityModel;
	}
	
	//User Login Request
	@PostMapping("/api/login")
	EntityModel<User> login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response){
		
		User login_user = userRepository.getUserByEmail(user.getEmail());
		if(login_user != null && passwordEncoder.matches(user.getPassword(), login_user.getPassword())) {
			request.getSession().setAttribute("LOGGED_USER", user.getEmail());
			user.setName(login_user.getName());
			user.setId(login_user.getId());
			user.setCountry_of_origin(login_user.getCountry_of_origin());
			user.setPhone_number(login_user.getPhone_number());
			user.setProfile_image(login_user.getProfile_image());
			return this.userAssembler.toModel(user);
		}else {
			throw new UserNotFoundException();
		}
	}

	
	//User Logout Request
	@GetMapping("/api/logout")
	EntityModel<User> logout(HttpServletRequest request) {
		String logout_user_email = (String) request.getSession().getAttribute("LOGGED_USER");
		User logout_user = userRepository.getUserByEmail(logout_user_email);
		request.getSession().invalidate();
		return this.userAssembler.toModel(logout_user);
	}
	
	
	//Get All Users Request
	@GetMapping("/api/users")
	public List<EntityModel<User>> getAllUsers(){
		List<EntityModel<User>> users = userRepository.findAll().stream()
				.map(userAssembler::toModel)
				.collect(Collectors.toList());
		
		return users;
	}

	
	//Get Single User By Id Request
	@GetMapping("/api/users/{id}")
	public EntityModel<User> getUser(@PathVariable Long id) {
		User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
		return this.userAssembler.toModel(user);
	}
	
	
	//Update User Request
	@PutMapping("/api/users/{id}")
	public EntityModel<User> updateUser(@PathVariable Long id, @RequestBody User user){
		User updated_user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
		updated_user.setId(id);
		updated_user.setName(user.getName());
		updated_user.setEmail(user.getEmail());
		updated_user.setPassword(passwordEncoder.encode(user.getPassword()));
		updated_user.setPhone_number(user.getPhone_number());
		updated_user.setCountry_of_origin(user.getCountry_of_origin());
		updated_user.setProfile_image(user.getProfile_image());
		
		EntityModel<User> entityModel = userAssembler.toModel(userRepository.save(updated_user));

		return entityModel;
	}

}
