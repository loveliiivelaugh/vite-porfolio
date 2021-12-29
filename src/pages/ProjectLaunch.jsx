
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import {items} from './../data';

const ProjectLaunch = () => {
  return (
    <>
      <ProjectsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Projects"
        subtitle="The range of services I offer"
      />
    </>
  )
};

export default ProjectLaunch


const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    marginTop: 60,
  },
  row: {
    // Reverse every other row
    "&:nth-of-type(even)": {
      flexDirection: "row-reverse",
    },

    // Spacing between rows
    "&:not(:last-child)": {
      marginBottom: `${theme.spacing(3)}px`,
    },
  },
  figure: {
    maxWidth: 300,
    margin: "30px auto",
  },
  image: {
    height: "auto",
    maxWidth: "100%",
  },
}));


function ProjectsSection(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        <Container
          maxWidth="lg"
          disableGutters
          className={classes.itemsContainer}
        >
          <Grid
            className={classes.row}
            container
            item
            alignItems="center"
            spacing={4}
          >
          {[...items, ...items].map(({title, image}, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                textAlign={{
                  xs: "center",
                  md: "left",
                }}
              >
                <Typography variant="h5" gutterBottom textAlign="center">
                  {title}
                </Typography>
                <img src={image} alt={title} height="400px" width="100%" />
              </Box>
            </Grid>
          ))}
          </Grid>
        </Container>
      </Container>
    </Section>
  );
}