package tech.corefinance.common.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tech.corefinance.common.dto.GeneralApiResponse;
import tech.corefinance.common.ex.ResourceNotFound;
import tech.corefinance.common.ex.ServiceProcessingException;

import javax.xml.parsers.ParserConfigurationException;
import java.util.NoSuchElementException;

/**
 * Handle generic exception.
 */
@ControllerAdvice
@ResponseBody
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
@Slf4j
public class ExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ServiceProcessingException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public Object handleProcessingException(HttpServletRequest request, Exception e) {
        return handleGeneralException(request, e, 1);
    }

    @ExceptionHandler(value = {ParserConfigurationException.class, JsonProcessingException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public String handleJsonException(Exception e) {
        log.error("Parse exception", e);
        return "{\"status\": 1, \"statusCode\": \"invalid_input_or_response\", \"result\": {}}";
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public GeneralApiResponse<String> accessDenied(AccessDeniedException e) {
        log.debug(e.getMessage(), e);
        return new GeneralApiResponse<>("access_denied", 1, e.getMessage());
    }

    @ExceptionHandler({IllegalArgumentException.class, ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public GeneralApiResponse<String> badRequest(Exception e) {
        log.debug(e.getMessage(), e);
        if (e instanceof IllegalArgumentException) {
            return new GeneralApiResponse<>("bad_request", 1, e.getMessage());
        }
        if (e instanceof ConstraintViolationException) {
            return new GeneralApiResponse<>("bad_request", 1, e.getMessage());
        }
        return new GeneralApiResponse<>("system_error", 1, null);
    }

    @ExceptionHandler(value = {Throwable.class})
    public GeneralApiResponse<String> internalServerError(Throwable e) {
        log.error("System Exception", e);
        return new GeneralApiResponse<>("system_error", 1, e.getMessage());
    }

    @ExceptionHandler(value = {ResourceNotFound.class, NoSuchElementException.class})
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public Object handleResourceNotFound(HttpServletRequest request, Exception e) {
        return handleGeneralException(request, e, 404);
    }

    private Object handleGeneralException(HttpServletRequest request, Exception e, int status) {
        String message = e.getMessage();
        Throwable cause = e.getCause();
        log.error("Return error for user: [{}]", message);
        if (cause != null) {
            log.error("Exception", cause);
        } else {
            cause = e;
        }
        if (message != null && !message.trim().isEmpty()) {
            if (!message.contains("\"statusCode\"")) {
                return new GeneralApiResponse<>(message, status, null);
            } else {
                return message;
            }
        } else {
            return internalServerError(cause);
        }
    }

    /**
     * Create the {@link ResponseEntity} to use from the given body, headers,
     * and statusCode. Subclasses can override this method to inspect and possibly
     * modify the body, headers, or statusCode, e.g. to re-create an instance of
     * {@link ProblemDetail} as an extension of {@link ProblemDetail}.
     * @param body the body to use for the response
     * @param headers the headers to use for the response
     * @param statusCode the status code to use for the response
     * @param request the current request
     * @return the {@code ResponseEntity} instance to use
     * @since 6.0
     */
    protected ResponseEntity<Object> createResponseEntity(
            @Nullable Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        var errorResponse = new GeneralApiResponse<>(body);
        if (body instanceof ProblemDetail problemDetail) {
            errorResponse.setStatus(problemDetail.getStatus());
        } else {
            errorResponse.setStatus(GeneralApiResponse.STATUS_UNKNOWN_ERROR);
        }
        return new ResponseEntity<>(errorResponse, headers, statusCode);
    }
}
