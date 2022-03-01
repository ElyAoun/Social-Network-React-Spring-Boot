package socialNetwork.Exceptions;

public class PostNotFoundException extends RuntimeException{

	public PostNotFoundException(Long id) {
		super("post "+id+" not found");
	}
}
