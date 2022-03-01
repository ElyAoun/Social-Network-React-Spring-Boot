package socialNetwork.Exceptions;

import org.springframework.web.bind.annotation.*;

import net.minidev.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;

@ControllerAdvice
public class UserAlreadyExistsAdvice {
	
	@ResponseBody
	@ExceptionHandler(UserAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, String> UserAlreadyExistsHandler(UserAlreadyExistsException ex) {
	    HashMap<String, String> map = new HashMap<>();
	    map.put("error", ex.getMessage());
	    return map;
	}
}
