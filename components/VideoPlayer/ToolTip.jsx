import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const ToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgb(38, 38, 38)',
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(16),
    padding: 0,
  },
}));

export default ToolTip;
