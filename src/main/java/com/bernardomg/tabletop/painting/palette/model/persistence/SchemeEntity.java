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

package com.bernardomg.tabletop.painting.palette.model.persistence;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.google.common.base.MoreObjects;

/**
 * Persistent entity for the example application.
 * <p>
 * This makes use of JPA annotations for the persistence configuration.
 *
 * @author Bernardo Mart&iacute;nez Garrido
 */
@Entity(name = "Scheme")
@Table(name = "schemes")
public class SchemeEntity implements Serializable {

    /**
     * Serialization ID.
     */
    @Transient
    private static final long         serialVersionUID = -9102550009091675104L;

    /**
     * Entity's ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long                      id               = -1l;

    /**
     * Name of the entity.
     * <p>
     * This is to have additional data apart from the id, to be used on the
     * tests.
     */
    @Column(name = "name", nullable = false, unique = true)
    private String                    name             = "";

    @OneToMany(mappedBy = "scheme")
    private Collection<PaletteEntity> palettes         = Collections
            .emptyList();

    /**
     * Constructs an example entity.
     */
    public SchemeEntity() {
        super();
    }

    @Override
    public final boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null) {
            return false;
        }

        if (getClass() != obj.getClass()) {
            return false;
        }

        final SchemeEntity other = (SchemeEntity) obj;
        return Objects.equals(id, other.id);
    }

    /**
     * Returns the identifier assigned to this entity.
     * <p>
     * If no identifier has been assigned yet, then the value will be lower than
     * zero.
     *
     * @return the entity's identifier
     */
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Collection<PaletteEntity> getPalettes() {
        return palettes;
    }

    @Override
    public final int hashCode() {
        return Objects.hash(id);
    }

    public void setId(final Long value) {
        id = checkNotNull(value, "Received a null pointer as identifier");
    }

    public void setName(final String value) {
        name = checkNotNull(value, "Received a null pointer as name");
    }

    public void setPalettes(final Collection<PaletteEntity> palettes) {
        this.palettes = palettes;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("id", id).add("name", name)
                .toString();
    }

}
