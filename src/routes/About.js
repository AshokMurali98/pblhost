import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import bgImg from "../assets/northwest-image3.jpg";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ParallaxContainer = styled.div`
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const AboutTextContainerCard = styled.div`
  background-color: #e9ffff;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px 3px rgba(202, 239, 255, 0.43);
  background-color: whitesmoke;
  border-radius: 10px;
`;

const DevCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const DevCard = styled.div`
  /* width: calc(100% / 3.5); */
`;

export default function AboutPage() {
  const developers = [
    {
      name: "Developer 1",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
    {
      name: "Developer 2",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
    {
      name: "Developer 3",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
    {
      name: "Developer 4",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
    {
      name: "Developer 5",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
    {
      name: "Developer 6",
      img: "https://hips.hearstapps.com/hmg-prod/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg",
      secondaryLine: "Developer",
    },
  ];
  return (
    <AboutContainer style={{ paddingBottom: "3rem" }}>
      <ParallaxContainer style={{ backgroundImage: `url(${bgImg})` }} />
      <Container>
        <AboutContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h4" textAlign="center">
              About
            </Typography>
            <AboutTextContainerCard>
              <Typography textAlign="center" variant="subtitle1">
                Northwest professional based learning (PBL) is one of the CIET project, and which is a platform for project to explore projects.
                Northwest's Faculties, students, any authorized users can post and discuss their potential PBL projects on this platform and
                unauthorized users can only view the public projects available on the platform. The authorized users receive requests for the projects
                which he/she has posted and can contact them through email or internal message system. After interviewing them, they can decide on the
                team to work on their project.
              </Typography>
            </AboutTextContainerCard>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h4" textAlign="center">
              The Developer's
            </Typography>
            <DevCardsContainer>
              {developers.map((item) => (
                <DevCard key={item.name}>
                  <Card
                    style={{
                      backgroundColor: "whitesmoke",
                      width: "100%",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 5px 3px rgba(202, 239, 255, 0.43)",
                    }}
                  >
                    <CardMedia component="img" height={"100%"} style={{ height: "180px" }} alt={item.name} src={item.img} />
                    <CardContent style={{ paddingBlock: "8px" }}>
                      <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: "0px", fontSize: "15px" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{ fontSize: "12px" }}>
                        {item.secondaryLine}
                      </Typography>
                    </CardContent>
                  </Card>
                </DevCard>
              ))}
            </DevCardsContainer>
          </div>
        </AboutContainer>
      </Container>
    </AboutContainer>
  );
}
