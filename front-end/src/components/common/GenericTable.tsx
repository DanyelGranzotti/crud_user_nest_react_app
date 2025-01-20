import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/rootReducer";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (item: T) => React.ReactNode;
}

const GenericTable = <T extends object>({
  columns,
  data,
  renderRowActions,
}: GenericTableProps<T>) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <table
      className={`w-full 
        ${theme === "dark" ? " text-modal-title" : "text-gray-600"}
        `}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="text-left w-full py-2" key={column.header}>
              {column.header}
            </th>
          ))}
          {renderRowActions && <th className="p-2">Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              {columns.map((column) => (
                <td
                  className="text-left w-full py-2"
                  key={column.accessor as string}
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.accessor])}
                </td>
              ))}
              {renderRowActions && (
                <td className="text-center p-2">{renderRowActions(item)}</td>
              )}
            </tr>
            {index < data.length - 1 && (
              <tr>
                <td colSpan={columns.length + (renderRowActions ? 1 : 0)}>
                  <hr />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
