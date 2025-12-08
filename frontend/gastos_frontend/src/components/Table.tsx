import React from 'react';

interface TableColumn<T> {
  key: keyof T | 'actions';
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
}

const Table = <T extends { id?: string | number }>(
  { data, columns, onRowClick, className = '' }: TableProps<T>
) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className={`w-full text-sm text-left text-gray-500 ${className}`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`py-3 px-6 ${column.align ? `text-${column.align}` : 'text-left'}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td colSpan={columns.length} className="py-4 px-6 text-center text-gray-900">
                No hay registros.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="bg-white border-b hover:bg-gray-50"
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-6 ${column.align ? `text-${column.align}` : 'text-left'}`}
                  >
                    {column.render
                      ? column.render(item)
                      : (column.key !== 'actions' ? (item[column.key as keyof T] as React.ReactNode) : null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
