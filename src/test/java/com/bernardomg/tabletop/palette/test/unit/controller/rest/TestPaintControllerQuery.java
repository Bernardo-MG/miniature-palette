/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2019 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.bernardomg.tabletop.palette.test.unit.controller.rest;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.bernardomg.tabletop.palette.paint.controller.PaintController;
import com.bernardomg.tabletop.palette.paint.model.PaintOption;
import com.bernardomg.tabletop.palette.paint.service.PaintService;
import com.bernardomg.tabletop.palette.test.config.UrlConfig;

/**
 * Verifies that {@link PaintController} handles queries.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RunWith(JUnitPlatform.class)
public final class TestPaintControllerQuery {

    /**
     * Argument captor for query data.
     */
    private ArgumentCaptor<String> captor;

    /**
     * Mocked MVC context.
     */
    private MockMvc                mockMvc;

    /**
     * Mocked service.
     */
    private final PaintService     service;

    /**
     * Default constructor;
     */
    public TestPaintControllerQuery() {
        super();

        service = getPaintService();
    }

    /**
     * Sets up the mocked MVC context.
     */
    @BeforeEach
    public final void setUpMockContext() {
        mockMvc = MockMvcBuilders.standaloneSetup(new PaintController(service))
                .setCustomArgumentResolvers(
                        new PageableHandlerMethodArgumentResolver())
                .alwaysExpect(MockMvcResultMatchers.status().isOk())
                .alwaysExpect(MockMvcResultMatchers.content()
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .build();
    }

    /**
     * Verifies that an empty string is used when there is no query.
     */
    @Test
    public final void testGet_NoQuery_EmptyQuery() throws Exception {
        final String query;

        mockMvc.perform(getGetRequest());

        query = captor.getValue();

        Assert.assertEquals("", query);
    }

    /**
     * Verifies that the query parameter is used for querying.
     */
    @Test
    public final void testGet_Query_SetsQuery() throws Exception {
        final String query;

        mockMvc.perform(getGetRequestWithQuery());

        query = captor.getValue();

        Assert.assertEquals("abc", query);
    }

    /**
     * Returns a request builder prepared for reading entities.
     * 
     * @return a request builder prepared for reading entities
     */
    private final RequestBuilder getGetRequest() {
        return MockMvcRequestBuilders.get(UrlConfig.PAINT)
                .contentType(MediaType.APPLICATION_JSON_UTF8);
    }

    /**
     * Returns a request builder prepared for reading entities and a page set.
     * 
     * @return a request builder prepared for reading entities
     */
    private final RequestBuilder getGetRequestWithQuery() {
        return MockMvcRequestBuilders.get(UrlConfig.PAINT + "?code=abc")
                .contentType(MediaType.APPLICATION_JSON_UTF8);
    }

    /**
     * Returns a mocked service.
     * <p>
     * It is prepared for using the pagination data argument captor.
     * 
     * @return a mocked service
     */
    private final PaintService getPaintService() {
        final PaintService service;   // Mocked service
        final Collection<PaintOption> entities; // Returned entities

        service = Mockito.mock(PaintService.class);

        entities = new ArrayList<>();
        entities.add(new PaintOption());
        entities.add(new PaintOption());
        entities.add(new PaintOption());

        captor = ArgumentCaptor.forClass(String.class);

        Mockito.when(service.findByCode(captor.capture())).thenReturn(entities);

        return service;
    }

}
