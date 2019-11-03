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

package com.bernardomg.tabletop.palette.product.service;

import static com.google.common.base.Preconditions.checkNotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.tabletop.palette.product.model.ProductInfo;
import com.bernardomg.tabletop.palette.product.repository.ProductRepository;

@Service
public final class DefaultProductService implements ProductService {

    private final ProductRepository paintRepository;

    @Autowired
    public DefaultProductService(final ProductRepository repository) {
        super();

        paintRepository = checkNotNull(repository,
                "The paint repository is required");
    }

    @Override
    public final Iterable<? extends ProductInfo> getAll() {
        return paintRepository.findAllOptions();
    }

}
