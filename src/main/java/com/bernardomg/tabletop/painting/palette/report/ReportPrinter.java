
package com.bernardomg.tabletop.painting.palette.report;

import java.io.OutputStream;

public interface ReportPrinter<T> {

    public void saveReport(final T data, final OutputStream output);

}
