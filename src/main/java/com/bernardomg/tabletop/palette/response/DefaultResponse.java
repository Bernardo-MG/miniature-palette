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

package com.bernardomg.tabletop.palette.response;

import static com.google.common.base.Preconditions.checkNotNull;

public class DefaultResponse<T> implements Response<T> {

    private T              content;

    private ResponseStatus status = ResponseStatus.SUCCESS;

    public DefaultResponse() {
        super();
    }

    public DefaultResponse(final T cont) {
        super();

        content = checkNotNull(cont, "Missing content");
    }

    public DefaultResponse(final T cont, final ResponseStatus stat) {
        super();

        content = checkNotNull(cont, "Missing content");
        status = checkNotNull(stat, "Missing status");
    }

    @Override
    public T getContent() {
        return content;
    }

    @Override
    public ResponseStatus getStatus() {
        return status;
    }

    public void setContent(final T value) {
        content = value;
    }

    public void setStatus(final ResponseStatus value) {
        status = value;
    }

}
