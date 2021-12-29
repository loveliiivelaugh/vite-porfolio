import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import {items} from './../data';


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


function FeaturesSection(props) {
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
          maxWidth="md"
          disableGutters
          className={classes.itemsContainer}
        >
          {items.map(({title, description, projects}, index) => (
            <Grid
              className={classes.row}
              container
              item
              alignItems="center"
              spacing={4}
              key={index}
            >
              <Grid item xs={12} md={6}>
                <Box
                  textAlign={{
                    xs: "center",
                    md: "left",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {description}
                  </Typography>
                  <>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/projects/${title.toLowerCase().replace(/ /g, "-")}`)}>
                    Learn More
                  </Button>
                  <Button variant="outlined" color="primary">
                    Learn More
                  </Button>
                  </>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{display:'flex', margin:'0 auto'}}>
                <ProjectsCarousel projects={projects} classes={classes} />
              </Grid>
            </Grid>
          ))}
        </Container>
      </Container>
    </Section>
  );
}

export default FeaturesSection;

const ProjectsCarousel = ({projects, classes}) => {
  const [activeItem, setActiveItem] = useState(0);

  const handlePrev = (max) => setActiveItem(prev => (prev === 0 ? max : prev - 1));
  const handleNext = (max) => setActiveItem(prev => (prev === max ? 0 : prev + 1));
  return (
    <>
      <Button variant="text" color="primary" onClick={() => handlePrev(projects.length - 1)}>{'<'}</Button>
        {projects.map(({title, image}, index) => index === activeItem && (
          <figure className={classes.figure}>
            <img
              src={image}
              alt={title}
              className={classes.image}
            />
          </figure>
        ))}
      <Button variant="text" color="primary" onClick={() => handleNext(projects.length - 1)}>{'>'}</Button>
    </>
  )
}
