package socialNetwork.Exceptions;

public class UserAlreadyExistsException extends RuntimeException {
	
	public UserAlreadyExistsException(){
		super("Email Is Already Used");
	}
}
