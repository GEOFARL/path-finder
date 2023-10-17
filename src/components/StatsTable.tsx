import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Algorithm, SavedState } from '../types';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { LOCAL_STORAGE_KEYS } from '../constants';

const handleDelete = (id: string) => {
  for (const key of LOCAL_STORAGE_KEYS) {
    const savedStates = localStorage.getItem(key);

    if (savedStates) {
      const parsedStates = JSON.parse(savedStates);
      const updatedState = parsedStates.filter(
        (state: SavedState) => state.id !== id
      );
      localStorage.setItem(key, JSON.stringify(updatedState));
    }
  }
};

const handleDeleteAll = (type: Algorithm) => {
  switch (type) {
    case 'A_STAR' as Algorithm: {
      localStorage.removeItem('savedStatesAStar');
      break;
    }
    case Algorithm.BFS: {
      localStorage.removeItem('savedStatesBFS');
      break;
    }
  }
};

const columns: GridColDef[] = [
  { field: 'size', headerName: 'Size (rows x cols)', width: 140 },
  { field: 'iterationCount', headerName: 'Iteration Count', width: 130 },
  {
    field: 'maxStatesInMemory',
    headerName: 'Max States In Memory',
    width: 180,
  },
  {
    field: 'totalGeneratedStates',
    headerName: 'Total Generated States',
    width: 180,
  },
  {
    field: 'timeTaken',
    headerName: 'Time Taken',
    width: 120,
  },
];

interface IRow {
  id: string;
  size: string;
  iterationCount: number;
  maxStatesInMemory: number;
  totalGeneratedStates: number;
  timeTaken: string;
}

function getRows(type: Algorithm) {
  const rows: IRow[] = [];
  let savedStates: string | null;

  switch (type) {
    case Algorithm.BFS: {
      savedStates = localStorage.getItem('savedStatesBFS');
      break;
    }
    case 'A_STAR' as Algorithm: {
      savedStates = localStorage.getItem('savedStatesAStar');
      break;
    }
  }

  let parsedSavedStates: SavedState[] = [];
  if (savedStates!) {
    parsedSavedStates = JSON.parse(savedStates);
  }

  parsedSavedStates.forEach((state) => {
    rows.push({
      ...state.stats,
      id: state.id,
      size: `${state.rows}x${state.cols}`,
      timeTaken: `${state.stats.timeTaken}ms`,
    });
  });

  return rows;
}

interface StatsTableProps {
  type: Algorithm;
}

const StatsTable: React.FC<StatsTableProps> = ({ type }) => {
  const [selectedRow, setSelectedRow] = useState<string>('');
  const setForceUpdate = useState<boolean>(false)[1];
  const rows = getRows(type);

  return (
    <div style={{ maxHeight: '900px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        onRowSelectionModelChange={(i: GridRowSelectionModel) => {
          if (i[0]) {
            setSelectedRow(i[0].toString());
          }
        }}
      />

      <Box
        display={'flex'}
        gap={'1rem'}
        justifyContent={'flex-end'}
        mt={'1rem'}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={selectedRow.length === 0}
        >
          Show State
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedRow.length === 0}
          onClick={() => {
            handleDelete(selectedRow);
            setForceUpdate((p) => !p);
            setSelectedRow('');
          }}
        >
          Delete Selected Row
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteAll(type);
            setForceUpdate((p) => !p);
          }}
        >
          Delete All Rows
        </Button>
      </Box>
    </div>
  );
};

export default StatsTable;
