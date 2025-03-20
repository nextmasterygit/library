import { mkConfig, generateCsv, download } from 'export-to-csv';

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

export const handleExportCsv = (data: Record<string, any>[]) => {
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
};
