//@ts-nocheck
import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { LocationData } from '../interfaces/interfaces';

interface TableProps {
  data: LocationData[];
  selectedrow: LocationData | null | undefined;
  columns: any;
}

const Table: React.FC<TableProps> = ({ columns, data, selectedrow }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex }
  } = useTable<LocationData>(
    {
      columns,
      data
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="w-full border-collapse text-sm">
        <thead className="bg-gray-200 font-medium text-gray-700">
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column , index) => (
                <th
                key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row , index) => {
            prepareRow(row);
            const rikFactorCell = row.cells.find(cell => cell.column.id === 'id');
            const rikFactor = rikFactorCell ? rikFactorCell.value : null;
            const rowClass =
              rikFactor && selectedrow && rikFactor === selectedrow.id + 1 ? `font-medium ${selectedrow.current_risk_rating < 33 ? 'bg-green-500' : (selectedrow.current_risk_rating >= 33 && selectedrow.current_risk_rating < 66) ? 'bg-yellow-500' : 'bg-red-500'}` : '';
            return (
              <tr {...row.getRowProps()} className={`bg-white ${rowClass}`} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                    key={index}
                      {...cell.getCellProps()}
                      className="px-4 py-2 border text-gray-800 font-normal"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination UI */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <div className="flex">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 text-sm rounded-l ${
              canPreviousPage ? 'text-blue-500 hover:bg-blue-500 hover:text-white' : 'bg-gray-200'
            }`}
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 text-sm rounded-r ${
              canNextPage ? 'text-blue-500 hover:bg-blue-500 hover:text-white' : 'bg-gray-200'
            }`}
          >
            {'>'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
