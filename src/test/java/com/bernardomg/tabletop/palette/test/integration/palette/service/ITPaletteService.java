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

package com.bernardomg.tabletop.palette.test.integration.palette.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.bernardomg.tabletop.palette.palette.model.PaletteGroupOption;
import com.bernardomg.tabletop.palette.palette.model.persistence.PaletteGroup;
import com.bernardomg.tabletop.palette.palette.repository.PaintRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteGroupRepository;
import com.bernardomg.tabletop.palette.palette.repository.PaletteRepository;
import com.bernardomg.tabletop.palette.palette.service.PaletteService;

/**
 * Integration tests for the {@link ExampleEntityService}.
 * <p>
 * As this service doesn't contain any actual business logic, and it just wraps
 * the example entities repository, these tests are for verifying everything is
 * set up correctly and working.
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        SqlScriptsTestExecutionListener.class,
        TransactionalTestExecutionListener.class })
@WebAppConfiguration
@ContextConfiguration(
        locations = { "classpath:context/application-context.xml" })
@TestPropertySource({ "classpath:config/persistence-access.properties",
        "classpath:config/service.properties" })
@Transactional
@Rollback
public class ITPaletteService {

    @Autowired
    private PaintRepository        paintRepository;

    @Autowired
    private PaletteGroupRepository paletteGroupRepository;

    @Autowired
    private PaletteRepository      paletteRepository;

    /**
     * Service being tested.
     */
    @Autowired
    private PaletteService         service;

    /**
     * Default constructor.
     */
    public ITPaletteService() {
        super();
    }

    @Test
    public void testSave_Empty_Count() {
        final PaletteGroupOption paletteGroup;

        paletteGroup = new PaletteGroupOption();

        service.save(paletteGroup);

        Assertions.assertEquals(0, paletteGroupRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSave_EmptyName() {
        final PaletteGroupOption paletteGroup;

        paletteGroup = new PaletteGroupOption();
        paletteGroup.setName("");

        service.save(paletteGroup);

        Assertions.assertEquals(0, paletteGroupRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSave_NoPalettes_Count() {
        final PaletteGroupOption paletteGroup;

        paletteGroup = new PaletteGroupOption();
        paletteGroup.setName("palette");

        service.save(paletteGroup);

        Assertions.assertEquals(1, paletteGroupRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

    @Test
    public void testSave_NoPalettes_Created() {
        final PaletteGroupOption paletteGroup;
        final PaletteGroup group;

        paletteGroup = new PaletteGroupOption();
        paletteGroup.setName("palette");

        service.save(paletteGroup);

        group = paletteGroupRepository.findAll().iterator().next();

        Assertions.assertEquals("palette", group.getName());
    }

    @Test
    public void testSave_RepeatName() {
        final PaletteGroupOption paletteGroup;

        paletteGroup = new PaletteGroupOption();
        paletteGroup.setName("palette");

        service.save(paletteGroup);
        service.save(paletteGroup);

        Assertions.assertEquals(2, paletteGroupRepository.count());
        Assertions.assertEquals(0, paletteRepository.count());
        Assertions.assertEquals(0, paintRepository.count());
    }

}
