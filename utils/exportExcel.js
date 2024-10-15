import FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import Swal from 'sweetalert2';
import Colors from '../constants/colors';

const ExportExcel = ({ excelData, fileName, columnHeaders }) => {
  const exportToExcel = async () => {
    if (excelData.length === 0) {
      Swal.fire({
        icon: 'warning',
        text: 'No data to Export!!',
        confirmButtonColor: Colors.primaryColor,
        allowOutsideClick: false,
      });
      return;
    } else {
      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';

      // Map the variable names to header names
      const mappedData = excelData.map((row) => {
        const mappedRow = {};
        for (const key in row) {
          if (columnHeaders.hasOwnProperty(key)) {
            mappedRow[columnHeaders[key]] = row[key];
          }
        }
        return mappedRow;
      });

      const ws = XLSX.utils.json_to_sheet(mappedData);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    }
  };

  return (
    <div>
      <button
        onClick={(e) => exportToExcel(fileName)}
        className={'button'}
        style={{ cursor: 'pointer', fontSize: 14 }}
      >
        Export
      </button>
    </div>
  );
};

export default ExportExcel;
