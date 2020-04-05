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

package com.bernardomg.tabletop.painting.test.integration.scheme.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.painting.Application;
import com.bernardomg.tabletop.painting.palette.model.data.SchemeData;
import com.bernardomg.tabletop.painting.palette.service.SchemeService;
import com.google.common.collect.Iterables;

@SpringJUnitConfig
@Transactional
@Rollback
@ActiveProfiles("test")
@SpringBootTest(classes = Application.class)
public class ITSchemeServiceRead {

    /**
     * Service being tested.
     */
    @Autowired
    private SchemeService service;

    /**
     * Default constructor.
     */
    public ITSchemeServiceRead() {
        super();
    }

    @Test
    public void testRead_Empty() {
        final Iterable<SchemeData> read;

        read = service.getAllSchemes();

        Assertions.assertEquals(0, Iterables.size(read));
    }

    @Test
    @Sql({ "/db/scheme_simple.sql" })
    public void testRead_Full_Simple() {
        final Iterable<SchemeData> read;
        final SchemeData palette;

        read = service.getAllSchemes();

        Assertions.assertEquals(1, Iterables.size(read));

        palette = read.iterator().next();
        Assertions.assertEquals("Scheme1", palette.getName());
    }

}
