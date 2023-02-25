import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { GetServerSideProps } from "next";
import React from "react";
import { Project } from "../../../interfaces/commonInterfaces";
import { get } from "../../../utils/request";

type ProjectProps = {
  project: Project;
};

const titleStyle = {
  padding: "10px 0 16px"
};

const statusColor: { [x: string]: { color: string; borderColor: string } } = {
  draft: {
    color: "#bdbdbd",
    borderColor: "#bdbdbd"
  },
  scheduled: {
    color: "#000000",
    borderColor: "#000000"
  },
  inProgress: {
    color: "#1976d2",
    borderColor: "#1976d2"
  },
  onHold: {
    color: "#ef6c00",
    borderColor: "#ef6c00"
  },
  delayed: {
    color: "#e53935",
    borderColor: "#e53935"
  },
  completed: {
    color: "#388e3c",
    borderColor: "#388e3c"
  },
  closed: {
    color: "#388e3c",
    borderColor: "#388e3c"
  }
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          padding: "8px 14px",
          minHeight: "calc(100vh - 64px)"
        }
      }}
    >
      <Paper>
        <Typography variant="h1" component="h1" sx={titleStyle}>
          {project.name} ({project.projectID})
        </Typography>
        <Grid container>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Project Owner
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.owner}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Scheduled Start Date
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {moment(project.scheduledStartDate).format("LL")}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Actual Start Date
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.actualStartDate ? moment(project.actualStartDate).format("LL") : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Status
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              <Chip label={project.status} size="small" variant="outlined" sx={statusColor[project.status]} />
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Project Client
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.client}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Scheduled End Date
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.scheduledEndDate ? moment(project.scheduledEndDate).format("LL") : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Actual End Date
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.actualEndDate ? moment(project.actualEndDate).format("LL") : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" component="p">
              Expected End Date
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {project.expectedEndDate ? moment(project.expectedEndDate).format("LL") : "N/A"}
            </Typography>
          </Grid>
          {project.desc && (
            <Grid item xs={12} sm={12}>
              <Typography variant="caption" component="p">
                Description
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {project.desc}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};
export default Project;

export const getServerSideProps: GetServerSideProps = async context => {
  const { params = {} } = context;
  const { projectID } = params;

  try {
    const project = await get("/api/projects/v1/" + projectID);
    return {
      props: { project: project.data }
    };
  } catch (error: any) {
    console.error(error);
    return {
      props: { error }
    };
  }
};
