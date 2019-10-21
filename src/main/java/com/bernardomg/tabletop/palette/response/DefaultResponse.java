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

package com.bernardomg.tabletop.palette.response;

import static com.google.common.base.Preconditions.checkNotNull;

public class DefaultResponse<T> implements Response<T> {

    private T       content;

    private Boolean successful = true;

    public DefaultResponse() {
        super();
    }

    public DefaultResponse(final T cont) {
        super();

        content = checkNotNull(cont, "Missing content");
    }

    @Override
    public T getContent() {
        return content;
    }

    @Override
    public Boolean getSuccessful() {
        return successful;
    }

    public void setContent(final T content) {
        this.content = content;
    }

    public void setSuccessful(final Boolean successful) {
        this.successful = successful;
    }

}
