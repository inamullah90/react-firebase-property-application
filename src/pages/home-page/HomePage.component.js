import React, { useEffect, useState } from "react";
import useStyles from "./HomePage.styles";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ProjectCard from "../../components/project-card/ProjectCard.component";
import PropertyCard from "../../components/property-card/PropertyCard.component";
import VillaCard from "../../components/villa-card/VillaCard.component";
import { useAuth } from "../../context/auth-context";
import firebase from "../../firebase/firebase.utils";

const HomePage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [flats, setFlats] = useState([]);
  const [villas, setVillas] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (currentUser?.name === "") {
      history.push("/onboarding");
    }

    firebase
      .firestore()
      .collection("property")
      .where("propertyType", "==", "flat")
      .get()
      .then((res) => {
        const response = res.docs.map((item) => ({
          ...item.data(),
          docId: item.id,
        }));
        setFlats(response);
      });
    firebase
      .firestore()
      .collection("property")
      .where("propertyType", "==", "villa")
      .get()
      .then((res) => {
        const response = res.docs.map((item) => ({
          ...item.data(),
          docId: item.id,
        }));
        setVillas(response);
      });

    firebase
      .firestore()
      .collection("property")
      .where("propertyType", "==", "project")
      .get()
      .then((res) => {
        const response = res.docs.map((item) => ({
          ...item.data(),
          docId: item.id,
        }));
        setProjects(response);
      });
  }, [currentUser, history]);

  return (
    <div>
      <div className={classes.header}>
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className={classes.container}
        >
          <Typography
            variant="h2"
            className={classes.textHeader}
            color="secondary"
          >
            Search properties as per your convenience
          </Typography>
          <div className={classes.searchBox}>
            <div className={classes.linkDiv}>
              <Link to="/buy" className={classes.link}>
                Buy
              </Link>
              <Link to="/rent" className={classes.link}>
                Rent
              </Link>
              <Link to="/project" className={classes.link}>
                Project
              </Link>
            </div>
            <input
              type="text"
              className={classes.input}
              placeholder="Enter location or postal code"
            />
            <Button variant="contained" className={classes.searchButton}>
              Search
            </Button>
            <br />
            <br />
            <Link to="/" className={classes.link}>
              Advanced Search
            </Link>
          </div>
        </Container>
      </div>

      <div className={classes.featuredProjects}>
        <Typography
          variant="h3"
          color="primary"
          className={classes.featuredHeader}
        >
          Featured Projects
        </Typography>

        <Container>
          <Grid container spacing={2}>
            {projects &&
              projects?.slice(0, 2)?.map((project) => (
                <Grid item md={6}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>

      <div className={classes.property}>
        <Typography
          variant="h4"
          color="primary"
          className={classes.propertyHeader}
        >
          Amazing properties near you
        </Typography>
        <Container>
          <Grid spacing={2} container>
            {flats &&
              flats?.slice(0, 4)?.map((flat) => (
                <Grid item xs={12} md={3}>
                  <PropertyCard flat={flat} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>

      <div className={classes.property}>
        <Typography
          variant="h4"
          color="primary"
          className={classes.propertyHeader}
        >
          Personalized house
        </Typography>
        <Container>
          <Grid container spacing={2}>
            {villas &&
              villas?.slice(0, 2)?.map((villa) => (
                <Grid item md={6}>
                  <VillaCard villa={villa} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
