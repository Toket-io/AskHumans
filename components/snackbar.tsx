import { Button, ColorPaletteProp, Snackbar as JoySnackbar } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningSharp from "@mui/icons-material/WarningSharp";
import Error from "@mui/icons-material/Error";

interface SnackbarProps {
  severity: "success" | "warning" | "error";
  message: string;
  autoHideDuration: number | null;
  open: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  severity,
  message,
  autoHideDuration = 6000,
  open,
  onClose,
}) => {
  const color: ColorPaletteProp =
    severity === "success"
      ? "success"
      : severity === "warning"
      ? "warning"
      : "danger";

  const startDecorator =
    severity === "success" ? (
      <CheckCircleIcon />
    ) : severity === "warning" ? (
      <WarningSharp />
    ) : (
      <Error />
    );

  return (
    <JoySnackbar
      variant="soft"
      color={color}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHideDuration}
      startDecorator={startDecorator}
      endDecorator={
        <Button onClick={onClose} size="sm" variant="soft" color={color}>
          Dismiss
        </Button>
      }
    >
      {message}
    </JoySnackbar>
  );
};

export default Snackbar;
