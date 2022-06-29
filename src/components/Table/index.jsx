import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

import "./styles.scss";

export default function DataTable({ rows, columns }) {
  return (
    <Paper className="data-table">
      {/* <h2>Danh sách</h2> */}
      <div className="data-table_container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id}
          // loading={!rows.length}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          autoHeight
          density="comfortable"
          headerHeight={43}
          rowHeight={60}
          // disableColumnFilter={true}
          disableDensitySelector={true}
          disableColumnMenu={true}
          // hideFooterPagination
        />
      </div>
    </Paper>
  );
}
