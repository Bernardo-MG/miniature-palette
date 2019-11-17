/**
 * Copyright 2019 the original author or authors
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package com.bernardomg.tabletop.palette.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.bernardomg.tabletop.palette.response.DefaultFieldStatus;
import com.bernardomg.tabletop.palette.response.DefaultResponse;
import com.bernardomg.tabletop.palette.response.FieldStatus;
import com.bernardomg.tabletop.palette.response.Response;
import com.bernardomg.tabletop.palette.response.ResponseStatus;
import com.google.common.base.Predicates;

/**
 * Captures and handles exceptions for all the controllers.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Logger for the exception handler.
     */
    private static final Logger LOGGER = LoggerFactory
            .getLogger(GlobalExceptionHandler.class);

    /**
     * Default constructor.
     */
    public GlobalExceptionHandler() {
        super();
    }

    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<Object> handleExceptionDefault(final Exception ex,
            final WebRequest request) throws Exception {
        final HttpHeaders headers;
        final HttpStatus status;

        LOGGER.error(ex.getMessage(), ex);

        status = HttpStatus.INTERNAL_SERVER_ERROR;
        headers = new HttpHeaders();
        return handleExceptionInternal(ex, null, headers, status, request);
    }

    private final FieldStatus toFieldStatus(final FieldError error) {
        final FieldStatus status;

        status = new DefaultFieldStatus();
        status.setField(error.getField());
        status.setValue(error.getRejectedValue());
        // TODO: Object name and the other fields?

        return status;
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(final Exception ex,
            final Object body, final HttpHeaders headers,
            final HttpStatus status, final WebRequest request) {
        final Response<String> response;
        final String message;

        if (ex.getMessage() == null) {
            message = "";
        } else {
            message = ex.getMessage();
        }

        response = new DefaultResponse<>(message, ResponseStatus.FAILURE);

        return super.handleExceptionInternal(ex, response, headers, status,
                request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException ex, final HttpHeaders headers,
            final HttpStatus status, final WebRequest request) {
        final Collection<FieldStatus> validation;
        final Collection<FieldStatus> value;
        final Collection<FieldStatus> errors;
        final Response<Iterable<FieldStatus>> response;

        validation = ex.getBindingResult().getFieldErrors().stream()
                .filter(Predicates.not(FieldError::isBindingFailure))
                .map(this::toFieldStatus).collect(Collectors.toList());
        value = ex.getBindingResult().getFieldErrors().stream()
                .filter(FieldError::isBindingFailure).map(this::toFieldStatus)
                .collect(Collectors.toList());

        errors = new ArrayList<>();
        errors.addAll(validation);
        errors.addAll(value);

        response = new DefaultResponse<>(errors, ResponseStatus.WARNING);

        return super.handleExceptionInternal(ex, response, headers, status,
                request);
    }

}
