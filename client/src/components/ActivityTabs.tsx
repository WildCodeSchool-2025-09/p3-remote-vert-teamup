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
              fontSize: "var(--button-size)",
              fontFamily: "var(--button-font)",
              width: "50px",
              textTransform: "none",
              p: 0,
              position: "relative",
              color: "var(--dark-color)",
              opacity: "1",

              "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: "20%",
                height: "60%",
                width: "1px",
                backgroundColor: "var(--dark-color)",
              },
            },

            "@media (min-width:1024px)": {
              "& .MuiTab-root": {
                fontSize: "var(--button-desktop-size)",
                width: "200px",
              },
            },

            "& .MuiTab-root:last-of-type::after": {
              display: "none",
            },

            "& .MuiTab-root.Mui-selected::after": {
              display: "none",
            },

            "& .MuiTab-root:has(+ .Mui-selected)::after": {
              display: "none",
            },

            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "var(--button-color)",
              color: "var(--light-color)",
              boxShadow: "inset 0 4px 4px 0 rgba(0,0,0,0.25)",
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
