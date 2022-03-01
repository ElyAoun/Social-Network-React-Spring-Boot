package socialNetwork.Exceptions;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(){
		super("User Not Found");
	}
	
	public UserNotFoundException(Long id){
		super("User Not Found "+ id);
	}
}

