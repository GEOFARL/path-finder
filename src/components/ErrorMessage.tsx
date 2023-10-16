import { Alert, Snackbar } from '@mui/material';

interface ErrorMessageProps {
  open: boolean;
  handleClose: () => void;
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  open,
  handleClose,
  errorMessage,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%' }}
        variant="filled"
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
