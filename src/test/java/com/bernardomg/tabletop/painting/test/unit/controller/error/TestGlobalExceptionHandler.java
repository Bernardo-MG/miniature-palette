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

package com.bernardomg.tabletop.painting.test.unit.controller.error;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.bernardomg.tabletop.painting.controller.GlobalExceptionHandler;
import com.bernardomg.tabletop.painting.product.controller.ProductController;
import com.bernardomg.tabletop.painting.product.service.ProductService;
import com.bernardomg.tabletop.painting.test.config.UrlConfig;

/**
 * Unit tests for {@link GlobalExceptionHandler}, checking that it catches and
 * handles errors.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
public final class TestGlobalExceptionHandler {

    /**
     * Mocked MVC context.
     */
    private MockMvc mockMvc;

    /**
     * Default constructor.
     */
    public TestGlobalExceptionHandler() {
        super();
    }

    /**
     * Sets up the mocked MVC context.
     * <p>
     * It expects all the responses to have the OK (200) HTTP code.
     */
    @BeforeEach
    public final void setUpMockContext() {
        final GlobalExceptionHandler exceptionHandler;

        exceptionHandler = new GlobalExceptionHandler();
        mockMvc = MockMvcBuilders.standaloneSetup(getController())
                .setCustomArgumentResolvers(
                        new PageableHandlerMethodArgumentResolver())
                .setControllerAdvice(exceptionHandler)
                .alwaysExpect(MockMvcResultMatchers.content()
                        .contentType(MediaType.APPLICATION_JSON))
                .build();
    }

    /**
     * Verifies that when an exception is thrown in the backend an error
     * response is returned.
     */
    @Test
    public final void testSendFormData_UnhandledError() throws Exception {
        mockMvc.perform(getFormRequest())
                .andExpect(MockMvcResultMatchers.status().is5xxServerError())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status",
                        Matchers.equalTo("failure")));
    }

    /**
     * Returns a controller with mocked dependencies.
     * 
     * @return a mocked controller
     */
    private final ProductController getController() {
        final ProductService service; // Mocked service

        service = Mockito.mock(ProductService.class);

        Mockito.when(service.getAll()).thenThrow(RuntimeException.class);

        return new ProductController(service);
    }

    /**
     * Returns a request builder for posting the form data.
     * <p>
     * This request contains all the required request parameters.
     * <p>
     * There is only a single required parameter, the {@code name} parameter.
     * 
     * @return a request builder for posting the form data
     */
    private final RequestBuilder getFormRequest() {
        return MockMvcRequestBuilders.get(UrlConfig.PRODUCT);
    }

}
