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

package com.bernardomg.tabletop.palette.test.unit.controller.group;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.bernardomg.tabletop.palette.controller.GlobalExceptionHandler;
import com.bernardomg.tabletop.palette.palette.controller.PaletteGroupController;
import com.bernardomg.tabletop.palette.palette.model.data.PaletteGroupData;
import com.bernardomg.tabletop.palette.palette.service.PaletteGroupService;
import com.bernardomg.tabletop.palette.test.config.UrlConfig;

/**
 * Unit tests for {@link GlobalExceptionHandler}, checking that it catches and
 * handles errors.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RunWith(JUnitPlatform.class)
public final class TestPaletteGroupControllerCreateValidation {

    /**
     * Mocked MVC context.
     */
    private MockMvc                   mockMvc;

    private final PaletteGroupService service;

    /**
     * Default constructor.
     */
    public TestPaletteGroupControllerCreateValidation() {
        super();

        service = Mockito.mock(PaletteGroupService.class);
        Mockito.when(service.saveGroup(ArgumentMatchers.any()))
                .thenReturn(new PaletteGroupData());
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
                .setControllerAdvice(exceptionHandler).build();
    }

    @Test
    public final void testCreate_Empty() throws Exception {
        final RequestBuilder request;

        request = MockMvcRequestBuilders.post(UrlConfig.PALETTE_GROUP)
                .contentType(MediaType.APPLICATION_JSON_UTF8).content("{}");

        mockMvc.perform(request)
                .andExpect(MockMvcResultMatchers.jsonPath("$.status",
                        Matchers.equalTo("warning")))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content",
                        Matchers.not(Matchers.empty())));
    }

    @Test
    public final void testCreate_EmptyName() throws Exception {
        final RequestBuilder request;

        request = MockMvcRequestBuilders.post(UrlConfig.PALETTE_GROUP)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content("{\"name\":\"\"}");

        mockMvc.perform(request)
                .andExpect(MockMvcResultMatchers.jsonPath("$.status",
                        Matchers.equalTo("warning")))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content",
                        Matchers.hasSize(1)));
    }

    /**
     * Returns a controller with mocked dependencies.
     * 
     * @return a mocked controller
     */
    private final PaletteGroupController getController() {
        return new PaletteGroupController(service);
    }

}
