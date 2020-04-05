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

package com.bernardomg.tabletop.painting.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller for the home view.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@Controller
@RequestMapping("/")
public class HomeController {

    /**
     * Name for the welcome view.
     */
    private static final String VIEW_WELCOME = "index";

    /**
     * Default constructor.
     */
    public HomeController() {
        super();
    }

    /**
     * Shows the welcome view.
     * 
     * @return the welcome view
     */
    @GetMapping(produces = MediaType.TEXT_HTML_VALUE)
    public String showWelcome() {
        return VIEW_WELCOME;
    }

}
