import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Algorithm, SavedState } from '../types';
import { useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { handleDelete, handleDeleteAll } from '../utils/localStorage';
import StateBoard from './StateBoard';
import { calculateValue } from '../utils';

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

function getSavedStates(type: Algorithm) {
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

  return parsedSavedStates;
}

function getRows(type: Algorithm) {
  const rows: IRow[] = [];
  const parsedSavedStates = getSavedStates(type);

  parsedSavedStates.forEach((state) => {
    rows.push({
      ...state.stats,
      id: state.id,
      size: `${calculateValue(state.rows)}x${calculateValue(state.cols)}`,
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
  const [isShowingState, setIsShowingState] = useState<boolean>(false);
  const setForceUpdate = useState<boolean>(false)[1];

  const rows = getRows(type);

  const savedStates = useMemo(() => {
    return getSavedStates(type);
  }, [type]);

  const selectedState: SavedState = useMemo<SavedState>(() => {
    return savedStates.find((state) => state.id === selectedRow)!;
  }, [savedStates, selectedRow]);

  return !isShowingState ? (
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
        flexDirection={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={selectedRow.length === 0}
          onClick={() => {
            setIsShowingState((p) => !p);
          }}
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
  ) : (
    <Box display={'flex'} flexDirection={'column'}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          alignSelf: 'flex-end',
          width: '100px',
          mb: '1rem',
        }}
        onClick={() => setIsShowingState((p) => !p)}
      >
        Back
      </Button>
      <StateBoard
        cols={calculateValue(selectedState.cols)}
        rows={calculateValue(selectedState.rows)}
        start={selectedState.start}
        end={selectedState.end}
        walls={selectedState.walls}
      />
    </Box>
  );
};

export default StatsTable;
