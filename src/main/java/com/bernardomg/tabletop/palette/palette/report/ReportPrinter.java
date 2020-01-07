
package com.bernardomg.tabletop.palette.palette.report;

import java.io.OutputStream;

import com.bernardomg.tabletop.palette.palette.model.persistence.Palette;

public interface ReportPrinter {

    public void saveReport(final Palette data, final OutputStream output);

}
