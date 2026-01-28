import { AppBar, Box, Tab, Tabs } from "@mui/material";

type SegmentedControlProps = {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
};

function ActivityTabs({ selectedTab, setSelectedTab }: SegmentedControlProps) {
  return (
    <Box sx={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--neutral-color)",
          borderRadius: "12px",
          color: "var(--dark-color)",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          textColor="inherit"
          variant="standard"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: "var(--button-size)",
              fontFamily: "var(--button-mobile)",
              width: "50px",
              p: 0,
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "var(--button-color)",
              borderLeft:
                selectedTab === 1
                  ? "2px solid var(--dark-color)"
                  : selectedTab === 2
                    ? "2px solid var(--dark-color)"
                    : "0 solid var(--dark-color)",
              borderRight:
                selectedTab === 1
                  ? "2px solid var(--dark-color)"
                  : selectedTab === 2
                    ? "0px solid var(--dark-color)"
                    : "2px solid var(--dark-color)",
              borderRadius:
                selectedTab === 0
                  ? "12px 0 0 12px"
                  : selectedTab === 2
                    ? "0 12px 12px 0"
                    : "0",
            },
          }}
        >
          <Tab label="À venir" />
          <Tab label="Publiées" />
          <Tab label="En attente" />
        </Tabs>
      </AppBar>
    </Box>
  );
}

export default ActivityTabs;
