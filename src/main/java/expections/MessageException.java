package expections;

public class MessageException extends AssertionError {
    public MessageException(String message, Throwable throwable) {
        super(message, throwable);
    }
}