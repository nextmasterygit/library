import { mkConfig, generateCsv, download } from 'export-to-csv';
import { utility } from './helpers';
import { ColumnType } from '../../props';
import { renderCell } from '../../components/@cui/table/depends/renderCell';
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

export const handleExportCsv = (data: Record<string, any>[]) => {
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
};

export const handleArrangeCsvData = async (
  rows: Record<string, any>[],
  columns: ColumnType[],
) => {
  const formattedData = rows.map((row, index) => {
    return columns.reduce<Record<string, any>>((acc, column) => {
      const accessor = column.accessor;
      if (!accessor) return acc; // Skip if no accessor

      // Extract raw value
      const rawValue = accessor
        .split('.')
        .reduce((r, key) => (r ? r[key] : null), row);

      let formattedValue: any =
        typeof rawValue === 'object' ? JSON.stringify(rawValue) : rawValue;

      // Apply column render function if available
      if (column.render && typeof column.render === 'function') {
        const renderResult = column.render({
          row,
          index,
          data: rows,
          cell: rawValue,
        });

        if (
          typeof renderResult === 'string' ||
          typeof renderResult === 'number'
        ) {
          formattedValue = renderResult;
        }
      }

      // Format value based on column type (with safe type checking)
      switch (column.type) {
        case 'date':
          formattedValue =
            typeof rawValue === 'string' || rawValue instanceof Date
              ? utility.formatDate(rawValue)
              : rawValue;
          break;

        case 'currency':
          formattedValue =
            typeof rawValue === 'number'
              ? utility.currencyFormatter(
                  rawValue,
                  column.currency,
                  column.format,
                )
              : rawValue;
          break;
      }

      acc[column.title] = formattedValue;
      return acc;
    }, {});
  });

  if (formattedData.length > 0) {
    handleExportCsv(formattedData);
  }
};
