import React from 'react'
import { Link } from 'react-router-dom';

import styled from 'styled-components'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table'

import matchSorter from 'match-sorter'

import User from './User'
import CustomizedDialogs from './CustomizedDialogs'

const Styles = styled.div`
  padding: 1rem;
  text-align:center;

	
  table {
    border-spacing: 0;
    border: 1px solid black;
    margin:0 auto;
    min-width:93%;
    text-align:left;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    float:left;
    margin-left:3%;
    margin-top:3px;
  }
`
/*
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editable,
}) => {
 const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    updateMyData(index, id, value)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (!editable) {
    return `${initialValue}`
  }
  //ash
  if (value != null) {  return <input value={value} onChange={onChange} onBlur={onBlur} />};
  if (value == null) {  return <input value="" onChange={onChange} onBlur={onBlur} />};
  
}
*/

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Поиск по ${count} запис...`}
    />
  )
}



function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}


fuzzyTextFilterFn.autoRemove = val => !val


function Table({ columns, data, updateMyData, skipReset }) {
  const filterTypes = React.useMemo(
    () => ({

      fuzzyText: fuzzyTextFilterFn,

      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
 //     Cell: EditableCell,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, groupBy, expanded, filters, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      updateMyData,
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      initialState: { pageSize:20 },
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

    hooks => {
      hooks.flatColumns.push(columns => {
        return [
          {
            id: 'selection',
           groupByBoundary: true,
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]
      })
    }
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? '🛑 ' : '👊 '}
                      </span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);//console.log(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getExpandedToggleProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell', { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isRepeatedValue ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell', { editable: true })
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      { }
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span style={{margin:'5px'}}> страница{' '}<strong>{pageIndex + 1} из {pageOptions.length}</strong>{' '} </span>
        <span style={{margin:'5px'}}> | перейти на:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div style={{display:'none'}}>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              groupBy,
              expanded: expanded,
              filters,
              selectedRowIds: selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre>
      </div>
    </>
  )
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Tableau(props) {

  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState('...Loading...');
  const [open, setOpen] = React.useState(false);
  
  const callbackFunction = (childData) => {
    setMessage(childData);
  }
  
  const onUserClick = () => {
     setMessage('');
     setOpen(true);

  } 
    
  const columns = React.useMemo(
    () => [
      {
        Header: 'Список работников',
        columns: [

          {
            Header: 'Ф.И.О',
            accessor: 'name',
	   Cell: ({ cell: { row, original } }) => <div onClick={onUserClick}><User username={typeof row.original === 'undefined' ? row.subRows[0].original.name : row.original.name} id={typeof row.original === 'undefined' ? row.subRows[0].original._id : row.original._id} parentCallback={callbackFunction} /></div>,
           aggregate: ['sum', 'uniqueCount'],
            Aggregated: ({ cell: { value } }) => `${value} уникальных`,
	    disableGroupBy: true
          },   
          {
            Header: 'Логин',
	    accessor: 'username',
	   Cell: ({ cell: { row, original } }) => <div onClick={onUserClick}><Link className='name' to={`/employee/details/${typeof row.original === 'undefined' ? row.subRows[0].original._id : row.original._id}`}>{typeof row.original === 'undefined' ? row.subRows[0].original.username : row.original.username}</Link></div>,
           disableGroupBy: true
	  },       
	  {
            Header: 'E-mail',
            accessor: 'email',

            filter: 'fuzzyText',

           aggregate: ['sum', 'uniqueCount'],
            Aggregated: ({ cell: { value } }) => `${value} уникальных`,
	    disableGroupBy: true
          },
	  {
            Header: 'Должность',
            accessor: 'position',

            filter: 'fuzzyText',

           aggregate: ['sum', 'uniqueCount'],
            Aggregated: ({ cell: { value } }) => `${value} уникальных`,


          },
        ],
      },
    ],
    []
  )

  const skipResetRef = React.useRef(false)

  const updateMyData = (rowIndex, columnId, value) => {

    skipResetRef.current = true
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  React.useEffect(() => {
    skipResetRef.current = false
  }, [data])

  return (
    <Styles>
     <CustomizedDialogs content={message} open={open} parentCallback={() => setOpen(false)}/>    
     <Table
        columns={columns}
        data={props.users}
        updateMyData={updateMyData}
        skipReset={skipResetRef.current}
      />
    </Styles>
  )
}


export default Tableau
