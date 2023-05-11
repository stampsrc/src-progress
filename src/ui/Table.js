import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

const columns = [
  { field: 'id', headerName: 'ID', width: 40,  type: 'number'},
  {
    field: 'icon',
    headerName: 'Icon',
    width: 80,
    type: 'number',
    sortable: false,
    renderCell: (params) =>  {
      try {
        var encodedData = window.btoa(params.row.svg);
        return <Avatar  sx={{ width: 45, height: 45 }} src={'data:image/svg+xml;base64,'+ encodedData} variant="square"/>
      } catch (e) {
        try {
          var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(params.row.svg)));
          return <Avatar  sx={{ width: 45, height: 45 }} src={imgsrc} variant="square"/>
        } catch (e) {
          return '';
        }
      }


    }, // renderCell will render the component
  },
  { field: 'stamp', headerName: 'Stamp', width: 100, type: 'number'},
  { field: 'tick', headerName: 'Tick', width: 100, sortable: false },
  { field: 'max', headerName: 'Max', width: 140, type: 'number'},
  {
    field: 'lim',
    headerName: 'Lim',
    //description: 'This column has a value getter and is not sortable.',
    width: 140,
    type: 'number'
  },
  { field: 'mint', headerName: 'Mint', width: 70, type: 'number'},
  { field: 'creatorCount', headerName: 'Creator', width: 100, type: 'number'},
  { field: 'total', headerName: 'Total', width: 140, type: 'number'},
  { field: 'progress', headerName: '%', width: 100, type: 'number'},
  //{ field: '', headerName: '', width: 0,sortable: false},
];

const columnsSmall = [
  { field: 'stamp', headerName: 'Stamp', width: 70, type: 'number'},
  {
    field: 'icon',
    headerName: 'Icon',
    width: 40,
    type: 'number',
    sortable: false,
    renderCell: (params) =>  {
      try {
        var encodedData = window.btoa(params.row.svg);
        return <Avatar  sx={{ width: 30, height: 30 }} src={'data:image/svg+xml;base64,'+ encodedData} variant="square"/>
      } catch (e) {
        //console.log('e',e,params);
        try {
          var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(params.row.svg)));
          return <Avatar  sx={{ width: 30, height: 30 }} src={imgsrc} variant="square"/>
        } catch (e) {
          return '';
        }

      }
    }, // renderCell will render the component
  },
  { field: 'tick', headerName: 'Tick', width: 60, sortable: false },
  { field: 'mint', headerName: 'Mint', width: 15, type: 'number'},
  { field: 'creatorCount', headerName: 'Creator', width: 70, type: 'number'},
  { field: 'progress', headerName: '%', width: 45, type: 'number'},
];


export default function Table(props) {

  return (
    <div style={{ height: props.matches ? '85vh' : '70vh',  width: '100%' }}>
      <DataGrid
        loading={props.loading}
        rows={props.src20}
        columns={props.matches ? columns : columnsSmall}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 16 },
          },
        }}
        rowHeight={60}
        pageSizeOptions={[16, 32]}
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnFilter
        sx={{
          width:'100%',
          color: '#c0c0c0',
          backgroundColor:'#111111',
          boxShadow: 15,
          border: 2,
          fontSize: props.matches ? 15 : 11,
          borderColor: '#c0c0c0',
          '& .MuiDataGrid-cell:hover': {
            color: '#f2a900',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiTablePagination-root': {
            color:'#f2a900'
          },
          '& .MuiIconButton-root':{
            color: '#c0c0c0',
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
      />
    </div>
  );
}
