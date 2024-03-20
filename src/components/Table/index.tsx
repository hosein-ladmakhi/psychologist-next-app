"use client";

import {
  Box,
  Button,
  ButtonGroup,
  LinearProgress,
  Table as MuiTable,
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TTableFC } from "./index.type";
import { useConfirm } from "material-ui-confirm";

const Table: TTableFC = ({
  columns,
  rows,
  dataKey,
  title,
  createButtonLabel,
  handleFilter,
  handleDelete,
  handleEdit,
  handleCreate,
  handleChangePage = () => {},
  currentPage,
  totalPage,
  loading,
  deleteCancelConfirmationBtnText,
  deleteConfirmationDescription: DeleteConfirmationDescription,
  deleteConfirmationTitle,
  deleteOkConfirmationBtnText,
  handleResetFilter,
  additionalActions = [],
}) => {
  const confirm = useConfirm();
  const onHandleDelete = (data: any) => {
    if (handleDelete) {
      confirm({
        title: deleteConfirmationTitle || "آیا از حذف این آیتم اطمینان دارید ؟",
        cancellationButtonProps: { color: "error" },
        cancellationText: deleteCancelConfirmationBtnText || "خیر , لغو درخواست",
        confirmationText: deleteOkConfirmationBtnText || "بله , اطمینان دارم",
        description: DeleteConfirmationDescription ? <DeleteConfirmationDescription {...data} /> : undefined,
      })
        .then(() => {
          handleDelete(data);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h1" my="10px">
          {title || ""}
        </Typography>
        <ButtonGroup variant="contained" color="secondary">
          {handleCreate && <Button onClick={handleCreate}>{createButtonLabel}</Button>}
          {handleFilter && <Button onClick={handleFilter}>فیلتر جدول</Button>}
          {handleResetFilter && <Button onClick={handleResetFilter}>پاک کردن فیلتر ها</Button>}
        </ButtonGroup>
      </Box>
      <Box minHeight={500}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="center" component="th" key={column.name} width={column.width} style={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row?.[dataKey]}>
                {columns.map((column) => (
                  <TableCell align="center" key={row[dataKey]}>
                    {row?.[column?.name]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" alignItems="center" gap="20px">
                    {handleDelete && (
                      <Button color="error" onClick={onHandleDelete.bind(null, row)}>
                        حذف
                      </Button>
                    )}
                    {handleEdit && (
                      <Button color="primary" onClick={handleEdit.bind(null, row)}>
                        ویرایش
                      </Button>
                    )}
                    {additionalActions &&
                      additionalActions.map((action) => (
                        <Button key={action.text} color={action.color as any} onClick={action.onClick.bind(null, row)}>
                          {action.text}
                        </Button>
                      ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>

        {loading && <LinearProgress />}
      </Box>
      {typeof currentPage !== typeof undefined && (totalPage || 0) > 1 && (
        <Box mt="30px" width="100%" display="flex" justifyContent="center" alignItems="center">
          <Pagination color="secondary" page={currentPage} count={totalPage} onChange={(_, page: number) => handleChangePage(page)} />
        </Box>
      )}
    </>
  );
};

export default Table;
