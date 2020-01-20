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

package com.bernardomg.tabletop.painting.product.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.tabletop.painting.product.model.ProductInfo;
import com.bernardomg.tabletop.painting.product.service.ProductService;
import com.bernardomg.tabletop.painting.response.DefaultResponse;
import com.bernardomg.tabletop.painting.response.Response;

/**
 * Rest controller for paints.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/rest/product")
public class ProductController {

    /**
     * Paint service.
     */
    private final ProductService paintService;

    /**
     * Constructs a controller with the specified dependencies.
     * 
     * @param service
     *            example entity service
     */
    @Autowired
    public ProductController(final ProductService service) {
        super();

        paintService = checkNotNull(service, "The service is required");
    }

    @GetMapping
    public Response<Iterable<? extends ProductInfo>> read() {
        final Iterable<? extends ProductInfo> read;

        read = paintService.getAll();

        return new DefaultResponse<>(read);
    }

}
