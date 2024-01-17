'use client';

import { FC } from 'react';
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
} from '@mui/material';
import { ITableProps } from './index.type';
import { useConfirm } from 'material-ui-confirm';

const Table: FC<ITableProps> = ({
  columns,
  rows,
  dataKey,
  title,
  createButtonLabel,
  handleFilter,
  handleDelete,
  handleEdit,
  handleCreate,
  handleChangePage,
  currentPage,
  totalPage,
  loading,
  deleteCancelConfirmationBtnText,
  deleteConfirmationDescription: DeleteConfirmationDescription,
  deleteConfirmationTitle,
  deleteOkConfirmationBtnText,
}) => {
  const confirm = useConfirm();
  const onHandleDelete = (data: any) => {
    confirm({
      title: deleteConfirmationTitle || 'Are You Sure To Delete This Item',
      cancellationButtonProps: { color: 'error' },
      cancellationText:
        deleteCancelConfirmationBtnText || 'Cancel Deleting ...',
      confirmationText:
        deleteOkConfirmationBtnText || 'Yes, Im sure Delete Please',
      description: DeleteConfirmationDescription ? (
        <DeleteConfirmationDescription {...data} />
      ) : undefined,
    })
      .then(() => {
        handleDelete(data);
      })
      .catch(() => {});
  };

  return (
    <>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" component="h1" my="10px">
          {title}
        </Typography>
        <ButtonGroup>
          <Button onClick={handleFilter}>Filter Table</Button>
          <Button onClick={handleCreate} variant="contained">
            {createButtonLabel}
          </Button>
        </ButtonGroup>
      </Box>
      <Box minHeight={800}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="center"
                  component="th"
                  key={column.name}
                  width={column.width}
                  style={{ fontWeight: 'bold' }}
                >
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap="20px"
                  >
                    <Button
                      color="error"
                      onClick={onHandleDelete.bind(null, row)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleEdit.bind(null, row)}
                    >
                      Edit
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>

        {loading && <LinearProgress />}
      </Box>
      <Box
        mt="30px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          color="secondary"
          page={currentPage}
          count={totalPage}
          onChange={(_, page: number) => handleChangePage(page)}
        />
      </Box>
    </>
  );
};

export default Table;
