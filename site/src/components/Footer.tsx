import { Box, styled, Typography } from "@mui/material";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  textAlign: "center",
  position: "relative",
  bottom: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
  fontSize: "0.9em",
  borderTop: "1px solid #ddd",
}));

export const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} Proyecto React. Valencia, España.
      </Typography>
      <Typography variant="caption">
        Fecha y Hora Actual:{" "}
        {new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
      </Typography>
    </StyledFooter>
  );
};
