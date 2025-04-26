import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// Importando iconos de MUI
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";
import ScienceIcon from "@mui/icons-material/Science";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const BaseMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { text: "Edificios", icon: <AccountBalanceIcon />, route : "/buildings" },
    { text: "Defensa", icon: <SecurityIcon />, route : "/defense" },
    { text: "Investigación", icon: <ScienceIcon />, route : "/research" },
    { text: "Flota", icon: <RocketLaunchIcon />, route : "/fleet" },
  ];

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: React.SetStateAction<number>
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Base
        </Typography>
      </Box>
      <Divider />
      <List sx={{ py: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BaseMenu;
