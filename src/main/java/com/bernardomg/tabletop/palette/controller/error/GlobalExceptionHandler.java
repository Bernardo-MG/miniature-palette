/**
 * Copyright 2018 the original author or authors
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

package com.bernardomg.tabletop.palette.controller.error;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

/**
 * Captures and handles exceptions for all the controllers.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@ControllerAdvice
public class GlobalExceptionHandler extends AbstractHandlerExceptionResolver {

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

    @Override
    protected final ModelAndView doResolveException(
            final HttpServletRequest request,
            final HttpServletResponse response, final Object handler,
            final Exception ex) {

        LOGGER.error(ex.getMessage(), ex);

        try {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } catch (final IOException e) {}

        return new ModelAndView();
    }

}
